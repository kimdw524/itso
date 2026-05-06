import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import sharp from 'sharp';

import { resizeImage } from './file';

describe('utils/file', () => {
  describe('resizeImage', () => {
    it('원본 비율을 유지하면서 최대 크기 안으로 리사이징한다.', async () => {
      const tempDir = await fs.promises.mkdtemp(
        path.join(os.tmpdir(), 'crawler-file-util-'),
      );
      const filePath = path.join(tempDir, 'landscape.png');

      try {
        await sharp({
          create: {
            width: 400,
            height: 200,
            channels: 3,
            background: { r: 255, g: 255, b: 255 },
          },
        })
          .png()
          .toFile(filePath);

        await resizeImage(filePath, 100, 100);

        const metadata = await sharp(filePath).metadata();

        expect(metadata.width).toBe(100);
        expect(metadata.height).toBe(50);
      } finally {
        await fs.promises.rm(tempDir, { recursive: true, force: true });
      }
    });

    it('최대 크기보다 작은 이미지는 확대하지 않는다.', async () => {
      const tempDir = await fs.promises.mkdtemp(
        path.join(os.tmpdir(), 'crawler-file-util-'),
      );
      const filePath = path.join(tempDir, 'small.png');

      try {
        await sharp({
          create: {
            width: 40,
            height: 20,
            channels: 3,
            background: { r: 255, g: 255, b: 255 },
          },
        })
          .png()
          .toFile(filePath);

        await resizeImage(filePath, 100, 100);

        const metadata = await sharp(filePath).metadata();

        expect(metadata.width).toBe(40);
        expect(metadata.height).toBe(20);
      } finally {
        await fs.promises.rm(tempDir, { recursive: true, force: true });
      }
    });
  });
});
