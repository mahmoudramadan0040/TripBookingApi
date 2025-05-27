import cloudinary from "../config/cloudinary";
import multer from 'multer';
import path from 'path';

const uploadToCloudinary = multer({ storage: cloudinary });
export default uploadToCloudinary