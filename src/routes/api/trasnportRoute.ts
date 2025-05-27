import { Router } from 'express'
import TransportationController from '../../controllers/TransportationController'
import imageFilter from '../../middlewares/imageFilter'

// ------------- Transport Router -----------------//
const routes = Router()
const transport = new TransportationController()

routes.post(
  '/',
  imageFilter.fields([
    { name: 'cloudImages', maxCount: 5 },
    { name: 'localImages', maxCount: 5 },
  ]),
  transport.createTransportation,
)
routes.get('/', transport.getAllTransportation)
routes.get('/:id', transport.getTransportationById)
routes.put('/:id', transport.updateTransportation)
routes.delete('/:id', transport.deleteTransportation)

export default routes
