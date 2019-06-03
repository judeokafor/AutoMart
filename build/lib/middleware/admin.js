"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var isAdmin = function isAdmin(req, res, next) {
  if (req.user.isAdmin === false) {
    return res.status(400).send('You are not an admin');
  }

  return next();
};

var _default = isAdmin;
exports["default"] = _default;