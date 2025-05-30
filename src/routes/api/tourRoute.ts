import { Router } from 'express'
import TourController from '../../controllers/TourController'
// import { uploadLocal } from '../../services/LocalStorage.services'
import { uploadToCloudinary } from '../../services/StorageCloud.services'
// ------------- Tour Router -----------------//
const routes = Router()
const tour = new TourController()
routes.post(
  '/tour',
  uploadToCloudinary.fields([
    { name: 'cloudImages', maxCount: 20 },
    { name: 'localImages', maxCount: 20 },
  ]),
  tour.createTour,() => {})
routes.get('/', tour.getAllTours)
routes.get('/tour/:id', tour.getTourById )
routes.get('/search',tour.searchTours)
routes.put(
  '/tour/:id',
  uploadToCloudinary.fields([
    { name: 'cloudImages', maxCount: 20 },
    { name: 'localImages', maxCount: 20 },
  ]),
  tour.updateTour,
)
routes.put('/tour/soft_delete',tour.softDeleteTour)
routes.delete('/tour/:id', tour.deleteTour)

export default routes
