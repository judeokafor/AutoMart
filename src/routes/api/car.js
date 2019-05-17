import express from 'express';
import upload from '../../lib/config/multerConfig';
import carController from '../../controllers/car';

const router = express.Router();

router.post('/postAdvert', upload.any(), carController.postCarAd);
router.put('/markAsSold', carController.markAsSold);
router.put('/updateOrderPrice', carController.updateOrderPrice);
router.get('/viewSpecificCar/:id', carController.viewSpecificCar);

export default router;
