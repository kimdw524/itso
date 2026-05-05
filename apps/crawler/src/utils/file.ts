import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { pipeline } from 'stream/promises';

export const getExtensionFromURL = (url: string): string | null => {
  return url.match(/\.([^./?#]+)(?=$|\?|#)/)?.[1].toLowerCase() ?? null;
};

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

export const storeStaticImage = async (
  url: string,
  defaultExtension: string = 'png',
) => {
  const imageExtension = getExtensionFromURL(url) ?? defaultExtension;
  const filePath = generateStaticPath(`.${imageExtension}`);

  await downloadFile(url, filePath.path);

  return filePath.fileName;
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

  const resizedBuffer = await sharp(filePath)
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
