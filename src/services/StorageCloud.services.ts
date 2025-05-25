import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import config from '../config/config';

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.cloud_stroge_name,
  api_key: config.cloud_storage_key,
  api_secret: config.cloud_storage_secret,
});


// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params:async(req,file)=> ({
    folder: 'uploads',
    public_id: `${Date.now()}-${file.originalname}`,
    allowed_formats: ['jpg', 'png', 'jpeg'],
  })
});





export default storage;

