"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Car =
/*#__PURE__*/
function () {
  function Car(id, owner, // user id
  model, manufacturer, imageName, imageUrl, transmission, // automatic or manual
  year, fuelType, // disel or petrol
  bodyType, state, // used or new
  price, status, // sold and available default is available
  description, createdOn) {
    _classCallCheck(this, Car);

    this.id = id;
    this.owner = owner;
    this.model = model;
    this.manufacturer = manufacturer;
    this.imageName = imageName;
    this.imageUrl = imageUrl;
    this.transmission = transmission;
    this.year = year;
    this.fuelType = fuelType;
    this.bodyType = bodyType;
    this.state = state;
    this.price = price;
    this.status = status;
    this.description = description;
    this.createdOn = createdOn;
  }

  _createClass(Car, null, [{
    key: "carSchema",
    get: function get() {
      return _joi["default"].object({
        owner: _joi["default"].number().integer().required(),
        model: _joi["default"].string().trim().alphanum().required(),
        manufacturer: _joi["default"].string().trim().alphanum().required(),
        imageName: _joi["default"].string().trim().required(),
        transmission: _joi["default"].string(),
        year: _joi["default"].date(),
        fuelType: _joi["default"].string(),
        bodyType: _joi["default"].string(),
        state: _joi["default"].string(),
        price: _joi["default"].number().precision(4),
        status: _joi["default"].string(),
        description: _joi["default"].string().max(150)
      });
    }
  }, {
    key: "markAsSold",
    get: function get() {
      return _joi["default"].object({
        id: _joi["default"].string().required(),
        status: _joi["default"].string().required()
      });
    }
  }]);

  return Car;
}();

var _default = Car;
exports["default"] = _default;