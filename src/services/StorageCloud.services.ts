import cloudinary from "../config/cloudinary";
import multer from 'multer';
import path from 'path';
import fileFilter from "../middlewares/imageFilter";

const uploadToCloudinary = multer({ storage: cloudinary,fileFilter });
export default uploadToCloudinary