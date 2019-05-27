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

var Order =
/*#__PURE__*/
function () {
  function Order(id, buyer, carId, createdOn, status, priceOffered, oldPriceOffered, newPriceOffered) {
    _classCallCheck(this, Order);

    this.id = id;
    this.buyer = buyer;
    this.carId = carId;
    this.createdOn = createdOn;
    this.status = status;
    this.priceOffered = priceOffered;
    this.oldPriceOffered = oldPriceOffered;
    this.newPriceOffered = newPriceOffered;
  }

  _createClass(Order, null, [{
    key: "orderSchema",
    get: function get() {
      return _joi["default"].object({
        buyer: _joi["default"].number().integer().required(),
        carId: _joi["default"].number().integer().required(),
        price: _joi["default"].number().required(),
        priceOffered: _joi["default"].number().required()
      });
    }
  }, {
    key: "updateOrderSchema",
    get: function get() {
      return _joi["default"].object({
        price: _joi["default"].number().required(),
        id: _joi["default"].number().integer().required()
      });
    }
  }]);

  return Order;
}();

var _default = Order;
exports["default"] = _default;