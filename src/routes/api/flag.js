import express from 'express';
import flagController from '../../controllers/flag';

const router = express.Router();

router.post('/flagAdvert', flagController.flagAdvert);

export default router;
