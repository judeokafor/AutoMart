import express from 'express';
import upload from '../../lib/config/multerConfig';
import carController from '../../controllers/car';

const router = express.Router();

router.post('/postAdvert', upload.any(), carController.postCarAd);

export default router;
