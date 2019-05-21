import express from 'express';
import passport from 'passport';
import flagController from '../../controllers/flag';
import isAdmin from '../../lib/middleware/admin';
const router = express.Router();

router.post('/', flagController.flagAdvert);
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  isAdmin,
  flagController.viewAllFlags,
);

export default router;
