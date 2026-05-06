import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';

import {
  UploadLocalImageOptions,
  UploadLocalImageResult,
} from './r2.interface';

const IMAGE_CONTENT_TYPES: Record<string, string> = {
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
};

@Injectable()
export class R2Service {
  private readonly client: S3Client;

  /**
   * Cloudflare R2 업로드에 사용할 S3 호환 클라이언트를 초기화합니다.
   *
   * @param configService 환경변수 접근을 위한 Nest 설정 서비스
   */
  constructor(private readonly configService: ConfigService) {
    this.client = new S3Client({
      credentials: {
        accessKeyId: this.configService.getOrThrow<string>('R2_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow<string>(
          'R2_SECRET_ACCESS_KEY',
        ),
      },
      endpoint: `https://${this.configService.getOrThrow<string>(
        'R2_ACCOUNT_ID',
      )}.r2.cloudflarestorage.com`,
      region: 'auto',
      requestChecksumCalculation: 'WHEN_REQUIRED',
      responseChecksumValidation: 'WHEN_REQUIRED',
    });
  }

  /**
   * 로컬 이미지 파일을 Cloudflare R2 버킷에 업로드합니다.
   *
   * @param filePath 업로드할 로컬 이미지 경로
   * @param options R2 객체 키, 버킷, 공개 URL 등 업로드 옵션
   * @returns 업로드된 객체의 버킷, 키, 공개 URL
   */
  async uploadLocalImage(
    filePath: string,
    options: UploadLocalImageOptions = {},
  ): Promise<UploadLocalImageResult> {
    const stat = await fs.promises.stat(filePath);

    if (!stat.isFile()) {
      throw new Error(`${filePath} is not a file`);
    }

    const bucket =
      options.bucket ?? this.configService.getOrThrow<string>('R2_BUCKET_NAME');
    const key = this.getObjectKey(filePath, options.key);
    const contentType = this.getImageContentType(filePath, options.contentType);

    await this.client.send(
      new PutObjectCommand({
        Body: fs.createReadStream(filePath),
        Bucket: bucket,
        CacheControl: options.cacheControl,
        ContentLength: stat.size,
        ContentType: contentType,
        Key: key,
      }),
    );

    return {
      bucket,
      key,
      url: this.getPublicUrl(
        options.publicUrl ?? this.configService.get<string>('R2_PUBLIC_URL'),
        key,
      ),
    };
  }

  /**
   * 로컬 이미지 경로와 옵션을 기준으로 R2 객체 키를 만듭니다.
   *
   * @param filePath 업로드할 로컬 이미지 경로
   * @param key 직접 지정한 R2 객체 키
   * @returns R2 객체 키
   */
  private getObjectKey(filePath: string, key?: string): string {
    const objectKey = key ?? path.basename(filePath);

    return objectKey.replaceAll('\\', '/').replace(/^\/+/, '');
  }

  /**
   * 로컬 이미지 파일의 Content-Type을 확장자 기준으로 찾습니다.
   *
   * @param filePath 업로드할 로컬 이미지 경로
   * @param contentType 직접 지정한 Content-Type
   * @returns R2에 저장할 Content-Type
   */
  private getImageContentType(filePath: string, contentType?: string): string {
    if (contentType) {
      return contentType;
    }

    const extension = path.extname(filePath).toLowerCase();
    const imageContentType = IMAGE_CONTENT_TYPES[extension];

    if (!imageContentType) {
      throw new Error(`unsupported image extension: ${extension || 'unknown'}`);
    }

    return imageContentType;
  }

  /**
   * 공개 URL 설정이 있으면 업로드된 R2 객체 URL을 만듭니다.
   *
   * @param publicUrl R2 공개 도메인 URL
   * @param key R2 객체 키
   * @returns 공개 URL 또는 null
   */
  private getPublicUrl(
    publicUrl: string | undefined,
    key: string,
  ): string | null {
    if (!publicUrl) {
      return null;
    }

    const encodedKey = key
      .split('/')
      .map((segment) => encodeURIComponent(segment))
      .join('/');

    return `${publicUrl.replace(/\/+$/, '')}/${encodedKey}`;
  }
}
