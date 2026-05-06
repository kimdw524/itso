import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { pipeline } from 'stream/promises';

export const getExtensionFromURL = (url: string): string | null => {
  return url.match(/\.([^./?#]+)(?=$|\?|#)/)?.[1].toLowerCase() ?? null;
};

/**
 * 정적 파일 저장 경로와 파일명을 생성합니다.
 *
 * @param extension 생성할 파일 확장자
 * @returns 중복되지 않는 정적 파일 경로와 파일명
 */
export const generateStaticPath = (
  extension: `.${string}`,
): { path: string; fileName: string } => {
  while (true) {
    const uuid = crypto.randomUUID();
    const fileName = `${uuid}${extension}`;
    const fullPath = path.resolve(process.env.STATIC_DIR, fileName);

    if (!fs.existsSync(fullPath)) {
      return { path: fullPath, fileName };
    }
  }
};

export const downloadFile = async (url: string, fileName: string) => {
  const res = await fetch(url);

  if (!res.ok || res.body === null) {
    throw new Error(`download failed: ${res.status} ${res.statusText}`);
  }

  await fs.promises.mkdir(path.dirname(fileName), { recursive: true });

  await pipeline(res.body, fs.createWriteStream(fileName));

  return fileName;
};

/**
 * 로컬 파일이 존재하면 삭제합니다.
 *
 * @param filePath 삭제할 로컬 파일 경로
 * @returns 파일 삭제 여부
 */
export const removeFile = async (filePath: string): Promise<boolean> => {
  try {
    await fs.promises.unlink(filePath);
    return true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return false;
    }

    throw error;
  }
};

/**
 * 원격 이미지를 정적 파일 경로에 저장하고 저장된 파일명과 경로를 반환합니다.
 *
 * @param url 다운로드할 원격 이미지 URL
 * @param defaultExtension URL에서 확장자를 찾지 못했을 때 사용할 기본 확장자
 * @returns 저장된 정적 이미지 파일명과 경로
 */
export const storeStaticImage = async (
  url: string,
  defaultExtension: string = 'png',
) => {
  const imageExtension = getExtensionFromURL(url) ?? defaultExtension;
  const filePath = generateStaticPath(`.${imageExtension}`);

  await downloadFile(url, filePath.path);

  return {
    name: filePath.fileName,
    path: filePath.path,
  };
};

/**
 * 로컬 이미지 파일을 원본 비율을 유지한 채 지정한 최대 크기 안으로 리사이징합니다.
 *
 * @param filePath 리사이징할 로컬 이미지 파일 경로
 * @param maxWidth 허용할 최대 너비
 * @param maxHeight 허용할 최대 높이
 * @returns 리사이징된 파일 경로
 */
export const resizeImage = async (
  filePath: string,
  maxWidth: number,
  maxHeight: number,
) => {
  if (
    !Number.isFinite(maxWidth) ||
    maxWidth <= 0 ||
    !Number.isFinite(maxHeight) ||
    maxHeight <= 0
  ) {
    throw new Error('maxWidth and maxHeight must be greater than 0');
  }

  const imageBuffer = await fs.promises.readFile(filePath);
  const resizedBuffer = await sharp(imageBuffer)
    .resize({
      width: Math.round(maxWidth),
      height: Math.round(maxHeight),
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toBuffer();

  await fs.promises.writeFile(filePath, resizedBuffer);

  return filePath;
};
