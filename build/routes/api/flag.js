"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _flag = _interopRequireDefault(require("../../controllers/flag"));

var _admin = _interopRequireDefault(require("../../lib/middleware/admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _flag["default"].flagAdvert);
router.get('/', _passport["default"].authenticate('jwt', {
  session: false
}), _admin["default"], _flag["default"].viewAllFlags);
var _default = router;
exports["default"] = _default;