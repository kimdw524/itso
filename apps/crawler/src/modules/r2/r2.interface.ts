export interface UploadLocalImageOptions {
  bucket?: string;
  cacheControl?: string;
  contentType?: string;
  key?: string;
  publicUrl?: string;
}

export interface UploadLocalImageResult {
  bucket: string;
  key: string;
  url: string | null;
}
