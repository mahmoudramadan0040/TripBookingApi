import multer from 'multer';
import path from 'path';
import fileFilter from '../middlewares/imageFilter';
const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname,'../../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, uniqueSuffix + ext);
  },
});


export const uploadLocal = multer({storage:localStorage,fileFilter});