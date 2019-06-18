import express from 'express';
import resetController from '../../controllers/reset';
const router = express.Router();

router.post('/:email/reset_password', resetController.resetPassword);
export default router;
