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

router.get('/', carController.viewUnsoldCarBetweenMaxandMin);
router.get('/view', carController.viewUnsoldCar);
router.get(
  '/viewAllAdverts',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  carController.viewAllAdverts,
);
router.get('/used', carController.viewUsedUnsoldCar);
router.get('/new', carController.viewNewUnsoldCar);

router.get('/:id', carController.viewSpecificCar);

router.delete(
  '/deleteAdvert/:id',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  carController.deleteAdvert,
);

router.get(
  '/viewUnsoldCarsWithMake/:manufacturer',
  carController.viewUnsoldCarSpecificMake,
);

router.get(
  '/viewAllWithSpecificBodyType/:bodyType',
  carController.viewAllWithSpecificBodyType,
);

export default router;
