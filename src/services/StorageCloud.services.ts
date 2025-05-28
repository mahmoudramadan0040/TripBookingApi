import Configcloudinary from '../config/cloudinary'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'
import path from 'path'
import fileFilter from '../middlewares/imageFilter'

export const uploadToCloudinary = multer({ storage: Configcloudinary, fileFilter })

export const UpdateToCloudinary = async (files: any) => {
  let imageUrls: string[] = [];
  if (files && Array.isArray(files)) {
    for (const file of files) {
      const result = await cloudinary.uploader.upload(
        file.path || file.buffer,
        {
          folder: 'uploads', // optional folder name in Cloudinary
        },
      )
      imageUrls.push(result.secure_url);
    }
    return imageUrls;
  }
}


