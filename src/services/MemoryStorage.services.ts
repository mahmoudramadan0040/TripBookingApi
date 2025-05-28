import multer from 'multer'
import fileFilter from '../middlewares/imageFilter';
const upload = multer({ storage: multer.memoryStorage(),fileFilter }).fields([
  { name: 'localImages', maxCount: 3 },
  { name: 'cloudImages', maxCount: 3 },
])
export default upload;


