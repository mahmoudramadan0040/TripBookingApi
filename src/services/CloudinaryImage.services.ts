// services/CloudinaryImageService.ts
import { v2 as cloudinary } from 'cloudinary'
import { IImageService } from '../interfaces/image.interface';
import fs from 'fs'
import config from '../config/config';
export class CloudinaryImageService implements IImageService {

    
  async deleteImage(publicId: string): Promise<void> {
    await cloudinary.uploader.destroy(publicId)
  }

  async updateImage(
    oldPublicId: string,
    newFilePath: string
  ): Promise<{ url: string; public_id: string }> {
    // Delete old image
    await this.deleteImage(oldPublicId)

    // Upload new image
    const result = await cloudinary.uploader.upload(newFilePath)
    // Optionally delete local temp file
    fs.unlinkSync(newFilePath)

    return {
      url: result.secure_url,
      public_id: result.public_id,
    }
  }
}