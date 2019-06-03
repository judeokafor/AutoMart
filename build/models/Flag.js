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

var Flag =
/*#__PURE__*/
function () {
  function Flag(id, carId, reason, description, createdOn, name, email, phone) {
    _classCallCheck(this, Flag);

    this.id = id;
    this.carId = carId;
    this.reason = reason;
    this.description = description;
    this.createdOn = createdOn;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  _createClass(Flag, null, [{
    key: "flagSchema",
    get: function get() {
      return _joi["default"].object({
        carId: _joi["default"].number().integer().required(),
        reason: _joi["default"].string().trim().min(2).required(),
        description: _joi["default"].string().trim().min(5).required(),
        name: _joi["default"].string().min(2).trim().required(),
        email: _joi["default"].string().email().required(),
        phone: _joi["default"].string().trim().required().regex(/^[0-9]{7,10}$/)
      });
    }
  }]);

  return Flag;
}();

var _default = Flag;
exports["default"] = _default;