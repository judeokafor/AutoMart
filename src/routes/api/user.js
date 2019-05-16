import express from 'express';
import passport from 'passport';
import userController from '../../controllers/user';

const router = express.Router();

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);
router.get(
  '/currentProfile',
  passport.authenticate('jwt', { session: false }),
  userController.currentProfile,
);
router.get('/logout', userController.logOut);

export default router;
