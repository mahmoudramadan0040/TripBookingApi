import { Request , Response , NextFunction } from "express";
import transportation from "../models/transportation.model";
import { console } from "inspector";
class TransportationController{ 

// Create Transportation
createTransportation = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const { title, Duration, Description, included, excluded, highlight,price } = req.body;

    // Get Cloudinary uploaded files (if using fieldname: cloudImages)
    const cloudFiles = (req.files as any)?.cloudImages || [];
    const localFiles = (req.files as any)?.localImages || [];
    const cloudUrls =Array.isArray(cloudFiles) ? cloudFiles.map((file: any) => file.path):[]; // Cloudinary URL
    const localPaths =Array.isArray(localFiles) ? localFiles.map((file: Express.Multer.File) =>
      `/${file.filename}`
    ):[];
    const newTransportation =await transportation.create({
      title:title,
      Duration:Duration,
      Description:Description,
      included:included as string[],
      // excluded:excluded ,
      // highlight:highlight ,
      // price,
      //  // Expecting array of image URLs or paths
      // cloudImages:cloudUrls ,
      // localImages:localPaths 
    });

    res.status(201).json({ message: 'Transportation created', data: newTransportation });
  } catch (error) {
    next(error);
  }
};

// Get All
getAllTransportation = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const transportations = await transportation.findAll();
    res.json({ data: transportations });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transportation', error });
  }
};

// Get by ID
getTransportationById = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const result = await transportation.findByPk(id);
    if (!result)  res.status(404).json({ message: 'Not found' });

    res.json({ data: transportation });
  } catch (error) {
    // res.status(500).json({ message: 'Error fetching transportation', error });
    next(error)
  }
};

// Update
updateTransportation = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const [updated] = await transportation.update(req.body, { where: { id } });

    if (!updated)  res.status(404).json({ message: 'Not found or no changes' });

    const updatedTransportation = await transportation.findByPk(id);
    res.json({ message: 'Updated successfully', data: updatedTransportation });
  } catch (error) {
    // res.status(500).json({ message: 'Error updating transportation', error });
    next(error)
  }
};

// Delete
deleteTransportation = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const deleted = await transportation.destroy({ where: { id } });

    if (!deleted)  res.status(404).json({ message: 'Not found' });

    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    // res.status(500).json({ message: 'Error deleting transportation', error });
    next(error)
  }
};


}

export default TransportationController;