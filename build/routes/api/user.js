"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _user = _interopRequireDefault(require("../../controllers/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/signUp', _user["default"].signUp);
router.post('/signIn', _user["default"].signIn);
router.get('/getProfile', _passport["default"].authenticate('jwt', {
  session: false
}), _user["default"].currentProfile);
router.get('/logout', _user["default"].logOut);
var _default = router;
exports["default"] = _default;