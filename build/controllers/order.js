"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _Order = _interopRequireDefault(require("../models/Order"));

var _errorHandler = _interopRequireDefault(require("../lib/helpers/errorHandler"));

var _order = _interopRequireDefault(require("../dataStore/order"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var orderController =
/*#__PURE__*/
function () {
  function orderController() {
    _classCallCheck(this, orderController);
  }

  _createClass(orderController, null, [{
    key: "createOrder",
    value: function createOrder(req, res) {
      var orderData = req.body;

      var result = _joi["default"].validate(orderData, _Order["default"].orderSchema, {
        convert: false
      });

      if (result.error === null) {
        var order = new _Order["default"](orderData.id = Math.ceil(Math.random() * 100000 * (_order["default"].length + 1)), orderData.buyer, orderData.carId, orderData.status = 'pending', orderData.price, orderData.priceOffered, orderData.oldPriceOffered = null, orderData.newPriceOffered = null, orderData.createdOn);

        _order["default"].push(order);

        return res.status(201).json({
          status: 'success',
          message: 'Created succesfully',
          data: order
        });
      }

      return _errorHandler["default"].validationError(res, result);
    }
  }, {
    key: "updateOrder",
    value: function updateOrder(req, res) {
      var _req$params = req.params,
          id = _req$params.id,
          price = _req$params.price;
      var updateNewOrder = {
        id: id,
        price: price
      };

      var result = _joi["default"].validate(updateNewOrder, _Order["default"].orderSchema, {
        convert: false
      });

      if (result.error) {
        var convertedId = parseInt(id, 10);

        var relatedOrder = _order["default"].find(function (order) {
          return parseInt(order.id, 10) === convertedId && order.status === 'pending';
        });

        if (relatedOrder) {
          relatedOrder.newPriceOffered = price;
          return res.status(200).json({
            status: 'success',
            message: 'Updated Succesfully',
            data: relatedOrder
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Order not found'
        });
      }

      return _errorHandler["default"].validationError(res, result);
    }
  }]);

  return orderController;
}();

exports["default"] = orderController;