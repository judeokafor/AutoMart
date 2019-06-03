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

var User =
/*#__PURE__*/
function () {
  function User(id, firstName, lastName, phoneNumber, address, gender, email, password, avatar, isAdmin, role) {
    _classCallCheck(this, User);

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.gender = gender;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.isAdmin = isAdmin;
    this.role = role;
  }

  _createClass(User, null, [{
    key: "userSchema",
    get: function get() {
      return _joi["default"].object({
        lastName: _joi["default"].string().min(2).required(),
        firstName: _joi["default"].string().min(2).required(),
        phoneNumber: _joi["default"].string().trim().required().regex(/^[0-9]{7,10}$/),
        address: _joi["default"].string().trim().max(100),
        gender: _joi["default"].string().lowercase(),
        email: _joi["default"].string().email().required(),
        password: _joi["default"].string().alphanum().min(6).max(16).required(),
        isAdmin: _joi["default"].bool().required(),
        role: _joi["default"].string()
      });
    }
  }]);

  return User;
}();

var _default = User;
exports["default"] = _default;