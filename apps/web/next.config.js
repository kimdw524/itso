import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default withVanillaExtract(nextConfig);
