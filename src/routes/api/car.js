import express from 'express';
import carController from '../../controllers/car';
import upload from '../../lib/config/multerConfig';

const router = express.Router();

router.post('/postAdvert', upload.any(), carController.postCarAd);

export default router;
