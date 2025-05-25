import { Request , Response , NextFunction } from "express";
import Transportion from "../models/transportation.model";
class TransportationController{ 

// Create Transportation
createTransportation = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { title, Duration, Description, include, exclude, highlight } = req.body;

    const newTransportation = await Transportion.create({
      title,
      Duration,
      Description,
      include,
      exclude,
      highlight,
    });

    res.status(201).json({ message: 'Transportation created', data: newTransportation });
  } catch (error) {
    res.status(500).json({ message: 'Error creating transportation', error });
  }
};

// Get All
getAllTransportation = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const transportations = await Transportion.findAll();
    res.json({ data: transportations });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transportation', error });
  }
};

// Get by ID
getTransportationById = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const { id } = req.params;
    const transportation = await Transportion.findByPk(id);
    if (!transportation)  res.status(404).json({ message: 'Not found' });

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
    const [updated] = await Transportion.update(req.body, { where: { id } });

    if (!updated)  res.status(404).json({ message: 'Not found or no changes' });

    const updatedTransportation = await Transportion.findByPk(id);
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
    const deleted = await Transportion.destroy({ where: { id } });

    if (!deleted)  res.status(404).json({ message: 'Not found' });

    res.json({ message: 'Deleted successfully' });
  } catch (error) {
    // res.status(500).json({ message: 'Error deleting transportation', error });
    next(error)
  }
};


}

export default TransportationController;