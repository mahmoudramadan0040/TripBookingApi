import { Router } from 'express';
import OrderController from "../../controllers/OrderController"

const order = new OrderController();
const router = Router();

router.post('/paypal/create-order', order.createOrder);
router.post('/paypal/capture-order/:orderId', order.captureOrder);
