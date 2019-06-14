import express from 'express';
import passport from 'passport';
import userController from '../../controllers/user';

const router = express.Router();
router.get('/test', userController.testdbconnection);
router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);
router.get(
  '/getProfile',
  passport.authenticate('jwt', { session: false }),
  userController.currentProfile,
);
router.get('/logout', userController.logOut);

export default router;
