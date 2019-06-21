import express from 'express';
import passport from 'passport';
import upload from '../../lib/config/multerConfig';
import carController from '../../controllers/cars';
import isAdmin from '../../lib/middleware/admin';
import isSeller from '../../lib/middleware/seller';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  isSeller,
  upload.any(),
  carController.postCarAd,
);
router.get('/', carController.cars);

router.get('/:id', carController.viewSpecificCar);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  carController.deleteAdvert,
);
router.patch(
  '/:id/status',
  passport.authenticate('jwt', { session: false }),
  isSeller,
  carController.markAsSold,
);
router.patch(
  '/:id/price',
  passport.authenticate('jwt', { session: false }),
  isSeller,
  carController.updateOrderPrice,
);
export default router;
