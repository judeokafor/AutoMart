import express from 'express';
import passport from 'passport';

import orderController from '../../controllers/order';
import isBuyer from '../../lib/middleware/buyer';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isBuyer,
  orderController.createOrder,
);
router.put(
  '/:id/:price',
  passport.authenticate('jwt', { session: false }),
  orderController.updateOrder,
);

export default router;
