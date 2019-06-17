import JwtStrategy from 'passport-jwt';
import dotenv from 'dotenv';
import Queries from '../helpers/queries';
import db from '../helpers/dbHelpers';

const { Strategy, ExtractJwt } = JwtStrategy;
dotenv.config();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = process.env.SECRET_KEY;
opts.secretOrKey = 'winter is here';
module.exports = (passport) => {
  passport.use(
    new Strategy(opts, async (jwtPayLoad, next) => {
      const args = [jwtPayLoad.email];
      const { rows } = await db.Query(Queries.searchForEmail, args);
      const user = rows[0];
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    }),
  );
};
