import JwtStrategy from 'passport-jwt';
import dotenv from 'dotenv';
import Queries from '../helpers/queries';
import db from '../helpers/dbHelpers';
import ErrorHandler from '../helpers/errorHandler';

const { Strategy, ExtractJwt } = JwtStrategy;
dotenv.config();

const passportFunction = (passport) => {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = process.env.SECRET_KEY;
  passport.use(
    new Strategy(opts, async (jwtPayLoad, next) => {
      try {
        const args = [jwtPayLoad.email];
        const { rows } = await db.Query(Queries.searchForEmail, args);
        const user = rows[0];
        if (user) {
          next(null, user);
        } else {
          next(null, false);
        }
      } catch (error) {
        console.log(error);
      }
    }),
  );
};

export default passportFunction;
