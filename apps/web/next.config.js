import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
};

export default withVanillaExtract(nextConfig);
