"use strict";

var _passportJwt = _interopRequireDefault(require("passport-jwt"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _user = _interopRequireDefault(require("../../dataStore/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Strategy = _passportJwt["default"].Strategy,
    ExtractJwt = _passportJwt["default"].ExtractJwt;

_dotenv["default"].config();

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;

module.exports = function (passport) {
  passport.use(new Strategy(opts, function (jwtPayLoad, next) {
    var user = _user["default"].find(function (olduser) {
      return olduser.email === jwtPayLoad.email;
    });

    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  }));
};