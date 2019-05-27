"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _multerConfig = _interopRequireDefault(require("../../lib/config/multerConfig"));

var _cars = _interopRequireDefault(require("../../controllers/cars"));

var _admin = _interopRequireDefault(require("../../lib/middleware/admin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/', _passport["default"].authenticate('jwt', {
  session: false
}), _multerConfig["default"].any(), _cars["default"].postCarAd);
router.put('/:id/:status', _passport["default"].authenticate('jwt', {
  session: false
}), _cars["default"].markAsSold);
router.put('/:id/:price', _passport["default"].authenticate('jwt', {
  session: false
}), _cars["default"].updateOrderPrice);
router.get('/', _cars["default"].viewUnsoldCarBetweenMaxandMin);
router.get('/view', _cars["default"].viewUnsoldCar);
router.get('/viewAllAdverts', _passport["default"].authenticate('jwt', {
  session: false
}), _admin["default"], _cars["default"].viewAllAdverts);
router.get('/used', _cars["default"].viewUsedUnsoldCar);
router.get('/new', _cars["default"].viewNewUnsoldCar);
router.get('/:id', _cars["default"].viewSpecificCar);
router["delete"]('/deleteAdvert/:id', _passport["default"].authenticate('jwt', {
  session: false
}), _admin["default"], _cars["default"].deleteAdvert);
router.get('/viewUnsoldCarsWithMake/:manufacturer', _cars["default"].viewUnsoldCarSpecificMake);
router.get('/viewAllWithSpecificBodyType/:bodyType', _cars["default"].viewAllWithSpecificBodyType);
var _default = router;
exports["default"] = _default;