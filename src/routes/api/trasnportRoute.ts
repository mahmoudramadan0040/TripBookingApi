import { Router } from 'express'
import TransportationController from '../../controllers/TransportationController'
import { uploadLocal } from '../../services/LocalStorage.services'
import { uploadToCloudinary } from '../../services/StorageCloud.services'
// ------------- Transport Router -----------------//
const routes = Router()
const transport = new TransportationController()
routes.post(
  '/',
  uploadToCloudinary.fields([
    { name: 'cloudImages', maxCount: 20 },
    { name: 'localImages', maxCount: 20 },
  ]),
  transport.createTransportation,
  () => {},
)
routes.get('/', transport.getAllTransportation)
routes.get('/:id', transport.getTransportationById)
routes.put(
  '/:id',
  uploadToCloudinary.fields([
    { name: 'cloudImages', maxCount: 20 },
    { name: 'localImages', maxCount: 20 },
  ]),
  transport.updateTransportation,
)
routes.delete('/:id', transport.deleteTransportation)

export default routes
