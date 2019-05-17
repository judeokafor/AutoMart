import express from 'express';
import orderController from '../../controllers/order';

const router = express.Router();

router.post('/createOrder', orderController.createOrder);
router.put('/updateOrder', orderController.updateOrder);

export default router;
