"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _gravatar = _interopRequireDefault(require("gravatar"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _joi = _interopRequireDefault(require("joi"));

var _User = _interopRequireDefault(require("../models/User"));

var _user = _interopRequireDefault(require("../dataStore/user"));

var _errorHandler = _interopRequireDefault(require("../lib/helpers/errorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var userController =
/*#__PURE__*/
function () {
  function userController() {
    _classCallCheck(this, userController);
  }

  _createClass(userController, null, [{
    key: "test",
    value: function test(req, res) {
      res.json({
        message: 'user works'
      });
    }
  }, {
    key: "signUp",
    value: function signUp(req, res) {
      var userData = req.body;

      var result = _joi["default"].validate(userData, _User["default"].userSchema, {
        convert: false
      });

      if (result.error === null) {
        var salt = _bcryptjs["default"].genSaltSync(10);

        var hash = _bcryptjs["default"].hashSync(userData.password, salt);

        var avatar = _gravatar["default"].url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm'
        });

        var user = new _User["default"](userData.id = Math.ceil(Math.random() * 100000 * (_user["default"].length + 1)), userData.firstName, userData.lastName, userData.phoneNumber, userData.address, userData.gender, userData.email, userData.password = hash, userData.avatar = avatar, userData.isAdmin, userData.role);

        var verifiedUser = _user["default"].find(function (olduser) {
          return olduser.email === userData.email;
        });

        if (verifiedUser) {
          return res.status(400).json({
            status: 'error',
            message: 'Email Already Exist'
          });
        }

        _user["default"].push(user);

        var payload = {
          id: user.id,
          email: user.email,
          isAdmin: user.isAdmin
        };

        var token = _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY);

        return res.status(201).json({
          status: 'success',
          token: "Bearer ".concat(token),
          data: user
        });
      }

      return _errorHandler["default"].validationError(res, result);
    }
  }, {
    key: "signIn",
    value: function signIn(req, res) {
      var userData = req.body;

      var verifiedUser = _user["default"].find(function (databaseUser) {
        return databaseUser.email === userData.email;
      });

      if (!verifiedUser) {
        res.status(404).json({
          status: 'error',
          message: 'User Not Found'
        });
      } else {
        _bcryptjs["default"].compare(userData.password, verifiedUser.password).then(function (isMatch) {
          if (isMatch) {
            var payload = {
              id: userData.id,
              email: userData.email,
              isAdmin: userData.isAdmin
            };

            _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY, function (err, token) {
              if (err) {
                throw err;
              } else {
                res.status(201).json({
                  status: 'success',
                  message: 'Login Succesful',
                  token: "Bearer ".concat(token)
                });
              }
            });
          } else {
            return res.status(400).json({
              status: 'error',
              message: 'Password Incorrect'
            });
          }

          return false;
        });
      }
    }
  }, {
    key: "currentProfile",
    value: function currentProfile(req, res) {
      if (req.user) {
        return res.status(200).json({
          status: 'success',
          data: req.user
        });
      }

      return false;
    }
  }, {
    key: "logOut",
    value: function logOut(req, res) {
      req.logOut();
      res.status(200).json({
        status: 'success',
        message: 'Log out succesfully'
      });
    }
  }]);

  return userController;
}();

exports["default"] = userController;