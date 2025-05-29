import { Request, Response, NextFunction } from 'express'
import Tour from '../models/Tour.model'
import TourImage from '../models/TourImage.model'
import { Op } from 'sequelize'
class TourController {
  // Create Tour
  createTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        title,
        Duration,
        Description,
        included,
        excluded,
        highlight,
        price,
        locations,
      } = req.body

      const newTour = await Tour.create({
        title,
        Duration,
        Description,
        included,
        excluded,
        highlight,
        price,
        locations,
      })

      const cloudFiles = (req.files as any)?.cloudImages || []
      const localFiles = (req.files as any)?.localImages || []

      const cloudImages = cloudFiles.map((file: any) => ({
        cloudImage: file.path,
        publicId: file.filename,
        tourId: newTour.id,
      }))

      const localImages = localFiles.map((file: Express.Multer.File) => ({
        localImage: `/${file.filename}`,
        tourId: newTour.id,
      }))

      const imageRecords = [...cloudImages, ...localImages]

      if (imageRecords.length > 0) {
        await TourImage.bulkCreate(imageRecords)
      }

      const createdTour = await Tour.findByPk(newTour.id, {
        include: [{ model: TourImage, as: 'images' }],
      })
      res.status(201).json({
        message: 'Tour created',
        data: createdTour,
      })
    } catch (error) {
      next(error)
    }
  }

  // Get All Tours
  getAllTours = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : undefined
      const offset = req.query.offset ? Number(req.query.offset) : 0

      const options: any = {
        order: [['createdAt', 'DESC']],
        where: { IsDeleted: false },
      }

      if (limit && limit > 0) {
        options.limit = limit
        options.offset = offset
      }

      const { count, rows } = await Tour.findAndCountAll(options)

      res.json({
        total: count,
        count: rows.length,
        data: rows,
      })
    } catch (error) {
      next(error)
    }
  }

  // Get Tour by ID
  getTourById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const tour = await Tour.findByPk(id)

      if (!tour || tour.IsDeleted) {
        res.status(404).json({ message: 'Tour not found' })
      }

      res.json({ data: tour })
    } catch (error) {
      next(error)
    }
  }
  // search tour
  searchTours = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, location, minPrice, maxPrice } = req.query

      const where: any = {
        IsDeleted: false,
      }

      if (title) {
        where.title = { [Op.iLike]: `%${title}%` } // PostgreSQL partial match
      }

      if (location) {
        where.locations = { [Op.overlap]: [String(location)] } // PostgreSQL array match
      }

      if (minPrice || maxPrice) {
        where.price = {
          ...(minPrice && { [Op.gte]: Number(minPrice) }),
          ...(maxPrice && { [Op.lte]: Number(maxPrice) }),
        }
      }

      const results = await Tour.findAll({
        where,
        order: [['createdAt', 'DESC']],
      })

      res.status(200).json({ data: results })
    } catch (error) {
      console.error('Search tour error:', error)
      res.status(500).json({ message: 'Failed to search tours', error })
      next(error)
    }
  }
  // Update Tour
  updateTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const [updated] = await Tour.update(req.body, {
        where: { id },
      })

      if (!updated) {
        res.status(404).json({ message: 'Tour not found or no changes' })
      }

      const updatedTour = await Tour.findByPk(id)
      res.json({ message: 'Updated successfully', data: updatedTour })
    } catch (error) {
      next(error)
    }
  }

  // Hard Delete
  deleteTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const deleted = await Tour.destroy({ where: { id } })

      if (!deleted) {
        res.status(404).json({ message: 'Tour not found' })
      }

      res.json({ message: 'Tour deleted permanently' })
    } catch (error) {
      next(error)
    }
  }

  // Soft Delete
  softDeleteTour = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params
      const tour = await Tour.findByPk(id)

      if (!tour) {
        res.status(404).json({ message: 'Tour not found' })
      } else {
        tour.IsDeleted = true
        await tour.save()
      }

      res.json({ message: 'Tour soft deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}

export default TourController
