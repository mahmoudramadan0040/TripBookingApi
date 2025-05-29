import { Request, Response, NextFunction } from 'express'
import transportation from '../models/Transportation.model'
import { UpdateToCloudinary } from '../services/StorageCloud.services'
import TransportationImage from '../models/TransporationImage.model'

class TransportationController {
  // Create Transportation
  createTransportation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        title,
        Duration,
        Description,
        included,
        excluded,
        highlight,
        price,
      } = req.body

      const newTransportation = await transportation.create({
        title: title,
        Duration: Duration,
        Description: Description,
        included: included,
        excluded: excluded,
        highlight: highlight,
        price,
      })
      // Get Cloudinary uploaded files (if using fieldname: cloudImages)
      const cloudFiles = (req.files as any)?.cloudImages || []
      const localFiles = (req.files as any)?.localImages || []

      const cloudUrls = Array.isArray(cloudFiles)
        ? cloudFiles.map((file: any) => ({
            cloudImage: file.path,
            publicId: file.filename,
            transportationId: newTransportation.id,
          }))
        : [] // Cloudinary URL

      const localPaths = Array.isArray(localFiles)
        ? localFiles.map((file: Express.Multer.File) => `/${file.filename}`)
        : []
      // 2. Prepare TransportationImage records
      // Assuming TransportationImage model is imported as TransportationImage

      // Add cloud images
      const imageRecords = [
        ...cloudUrls,
        ...localPaths.map((path) => ({
          localImage: path,
          transportationId: newTransportation.id,
        })),
      ]

      // 3. Bulk create image records if any
      if (imageRecords.length > 0) {
        await TransportationImage.bulkCreate(imageRecords)
      }
      // 4. Fetch new transportation with images included
      const createdTransportWithImages = await transportation.findByPk(
        newTransportation.id,
        {
          include: [{ model: TransportationImage, as: 'images' }],
        },
      )
      res.status(201).json({
        message: 'Transportation created',
        data: createdTransportWithImages,
      })
    } catch (error) {
      next(error)
    }
  }
  // Get All
  getAllTransportation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // Optional: parse limit and offset from query params (for pagination)
      const limit =
        req.query.limit !== undefined ? Number(req.query.limit) : undefined
      const offset =
        req.query.offset !== undefined ? Number(req.query.offset) : 0
      // Build options dynamically
      const options: any = {
        order: [['createdAt', 'DESC']],
        include: [{ model: TransportationImage, as: 'images' }],
        where: { IsDeleted: false || null }, // add this line
      }
      if (limit && limit > 0) {
        options.limit = limit
        options.offset = offset
      }
      const { count, rows } = await transportation.findAndCountAll(options)

      res.json({
        total: count,
        count: rows.length,
        data: rows,
      })

      // res.json({
      //   data: await transportation.findAll({where:{IsDeleted:null}})
      // })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching transportation', error })
    }
  }

  // Get by ID
  getTransportationById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params
      const result = await transportation.findByPk(id, {
        include: [{ model: TransportationImage, as: 'images' }], // include images if needed
      })
      if (!result) res.status(404).json({ message: 'Not found' })

      res.json({ data: transportation })
    } catch (error) {
      res.status(500).json({ message: 'Error fetching transportation', error })
      next(error)
    }
  }

  // Update
  updateTransportation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params

      const urls = UpdateToCloudinary(req.files)
      const updateData = {
        ...req.body,
        ...(urls ? { cloudImages: urls } : {}),
      }
      const [updated] = await transportation.update(updateData, {
        where: { id },
      })

      if (!updated) res.status(404).json({ message: 'Not found or no changes' })

      const updatedTransportation = await transportation.findByPk(id)
      res.json({ message: 'Updated successfully', data: updatedTransportation })
    } catch (error) {
      res.status(500).json({ message: 'Error updating transportation', error })
      next(error)
    }
  }

  // Delete Hard
  deleteTransportation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params
      const deleted = await transportation.destroy({ where: { id } })

      if (!deleted) res.status(404).json({ message: 'Not found' })

      res.json({ message: 'Deleted successfully' })
    } catch (error) {
      // res.status(500).json({ message: 'Error deleting transportation', error });
      next(error)
    }
  }

  // soft delete
  SoftdeleteTransportation = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params

      const transport = await transportation.findByPk(id)
      if (!transport) {
        return res.status(404).json({ message: 'Not found' })
      }
      transport.IsDeleted = true
      await transport.save()

      res.json({ message: 'Deleted successfully (soft delete)' })
    } catch (error) {
      next(error)
    }
  }
}

export default TransportationController
