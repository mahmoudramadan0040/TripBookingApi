export interface IImageService {
  deleteImage(publicId: string): Promise<void>;
  updateImage(
    oldPublicId: string,
    newFilePath: string
  ): Promise<{ url: string; public_id: string }>;
}