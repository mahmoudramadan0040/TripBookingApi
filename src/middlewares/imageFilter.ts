import multer from 'multer';
import storage from '../config/cloudinary'
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};
const upload = multer({storage,fileFilter});
export default upload;