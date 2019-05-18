import express from 'express';
import passport from 'passport';
import upload from '../../lib/config/multerConfig';
import carController from '../../controllers/car';
import isAdmin from '../../lib/middleware/admin';

const router = express.Router();

router.post('/postAdvert', upload.any(), carController.postCarAd);
router.put('/markAsSold', carController.markAsSold);
router.put('/updateOrderPrice', carController.updateOrderPrice);
router.get('/viewSpecificCar/:id', carController.viewSpecificCar);
router.get('/viewUnsoldcars', carController.viewUnsoldCar);
router.get(
  '/viewUnsoldcarsWithRange',
  carController.viewUnsoldCarBetweenMaxandMin,
);
router.delete(
  '/deleteAdvert/:id',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  carController.deleteAdvert,
);

export default router;
