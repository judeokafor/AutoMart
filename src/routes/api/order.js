import express from 'express';
import passport from 'passport';
import orderController from '../../controllers/order';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  orderController.createOrder,
);
router.put(
  '/:id/:price',
  passport.authenticate('jwt', { session: false }),
  orderController.updateOrder,
);

export default router;
