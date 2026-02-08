import * as fs from 'fs';
import * as path from 'path';
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

export const storeStaticImage = async (
  url: string,
  defaultExtension: string = 'png',
) => {
  const imageExtension = getExtensionFromURL(url) ?? defaultExtension;
  const filePath = generateStaticPath(`.${imageExtension}`);

  await downloadFile(url, filePath.path);

  return filePath.fileName;
};
