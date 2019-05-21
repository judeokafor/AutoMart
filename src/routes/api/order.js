import express from 'express';
import orderController from '../../controllers/order';

const router = express.Router();

router.post('/', orderController.createOrder);
router.put('/:id/:price', orderController.updateOrder);

export default router;
