import JwtStrategy from 'passport-jwt';
import dotenv from 'dotenv';
import userStore from '../../dataStore/user';

const { Strategy, ExtractJwt } = JwtStrategy;
dotenv.config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;
module.exports = (passport) => {
  passport.use(
    new Strategy(opts, (jwtPayLoad, next) => {
      const user = userStore.find(
        olduser => olduser.email === jwtPayLoad.email,
      );
      console.log(user);
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    }),
  );
};
