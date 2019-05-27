"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _order = _interopRequireDefault(require("../../controllers/order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _passport["default"].authenticate('jwt', {
  session: false
}), _order["default"].createOrder);
router.put('/:id/:price', _passport["default"].authenticate('jwt', {
  session: false
}), _order["default"].updateOrder);
var _default = router;
exports["default"] = _default;