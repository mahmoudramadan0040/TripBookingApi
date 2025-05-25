import { Router } from 'express'
import TransportationController from '../../controllers/TransportationController'


// ------------- Transport Router -----------------//
const routes = Router()
const transport = new TransportationController()


routes.post('/', transport.createTransportation);
routes.get('/', transport.getAllTransportation);
routes.get('/:id',transport.getTransportationById);
routes.put('/:id', transport.updateTransportation);
routes.delete('/:id', transport.deleteTransportation);

export default routes;