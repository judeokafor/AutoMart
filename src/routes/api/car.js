import express from 'express';
import passport from 'passport';
import upload from '../../lib/config/multerConfig';
import carController from '../../controllers/car';
import isAdmin from '../../lib/middleware/admin';

const router = express.Router();

router.post('/', upload.any(), carController.postCarAd);
router.put('/:id/:status', carController.markAsSold);
router.put('/:id/price', carController.updateOrderPrice);

router.get('/:id', carController.viewSpecificCar);
router.get('/', carController.viewUnsoldCar);
router.get('/view', carController.viewUnsoldCarBetweenMaxandMin);

router.delete(
  '/deleteAdvert/:id',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  carController.deleteAdvert,
);
router.get(
  '/viewAllAdverts',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  carController.viewAllAdverts,
);
router.get(
  '/viewUnsoldCarsWithMake/:manufacturer',
  carController.viewUnsoldCarSpecificMake,
);
router.get('/viewNewUnsoldCar', carController.viewNewUnsoldCar);
router.get('/viewUsedUnsoldCar', carController.viewUsedUnsoldCar);
router.get(
  '/viewAllWithSpecificBodyType/:bodyType',
  carController.viewAllWithSpecificBodyType,
);

export default router;
