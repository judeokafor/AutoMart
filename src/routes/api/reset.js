import express from 'express';
import resetController from '../../controllers/reset';
const router = express.Router();

router.post('/resetPassword', resetController.resetPassword);
router.post('/confirmReset', resetController.confirmReset);
export default router;
