"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _user = _interopRequireDefault(require("../dataStore/user"));

var _nodemailer2 = _interopRequireDefault(require("../lib/config/nodemailer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_dotenv["default"].config();

var resetController =
/*#__PURE__*/
function () {
  function resetController() {
    _classCallCheck(this, resetController);
  }

  _createClass(resetController, null, [{
    key: "resetPassword",
    value: function () {
      var _resetPassword = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var email, verifiedUser, payload, token, url, transporter;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                email = req.body.email;
                _context.next = 3;
                return _user["default"].find(function (olduser) {
                  return olduser.email === email;
                });

              case 3:
                verifiedUser = _context.sent;

                if (!verifiedUser) {
                  _context.next = 13;
                  break;
                }

                payload = {
                  id: verifiedUser.id,
                  email: verifiedUser.email
                };
                token = _jsonwebtoken["default"].sign(payload, process.env.SECRET_KEY);
                url = "https://judeokafor.github.io/AutoMart?token=".concat(token);
                transporter = _nodemailer["default"].createTransport(_nodemailer2["default"].transportOptions());
                _context.next = 11;
                return transporter.sendMail(_nodemailer2["default"].MailOptionsReset(verifiedUser.firstName, url, email), function (error, info) {
                  if (error) {
                    console.log(error);
                    return res.status(409).json({
                      status: 'error',
                      message: 'Something went wrong while sending message'
                    });
                  }

                  return res.status(201).json({
                    status: 'success',
                    message: 'Message sent successfully',
                    data: {
                      message: info.response,
                      token: token
                    }
                  });
                });

              case 11:
                _context.next = 14;
                break;

              case 13:
                return _context.abrupt("return", res.status(404).json({
                  status: 'error',
                  message: 'User not found'
                }));

              case 14:
                return _context.abrupt("return", false);

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function resetPassword(_x, _x2) {
        return _resetPassword.apply(this, arguments);
      }

      return resetPassword;
    }()
  }, {
    key: "confirmReset",
    value: function () {
      var _confirmReset = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(req, res) {
        var _req$body, password, cnfPassword, token, receivedUser, email, verifiedUser, salt, hash, transporter;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _req$body = req.body, password = _req$body.password, cnfPassword = _req$body.cnfPassword;

                if (!(password !== cnfPassword)) {
                  _context2.next = 3;
                  break;
                }

                return _context2.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'Verify your password'
                }));

              case 3:
                token = req.query.token;
                _context2.prev = 4;
                receivedUser = _jsonwebtoken["default"].verify(token, process.env.SECRET_KEY);
                email = receivedUser.email;
                _context2.next = 9;
                return _user["default"].find(function (olduser) {
                  return olduser.email === email;
                });

              case 9:
                verifiedUser = _context2.sent;

                if (!verifiedUser) {
                  _context2.next = 17;
                  break;
                }

                salt = _bcryptjs["default"].genSaltSync(10);
                hash = _bcryptjs["default"].hashSync(password, salt);
                verifiedUser.password = hash;
                transporter = _nodemailer["default"].createTransport(_nodemailer2["default"].transportOptions());
                _context2.next = 17;
                return transporter.sendMail(_nodemailer2["default"].MailOptionsConfirm(verifiedUser.firstName, email), function (error, info) {
                  if (error) {
                    console.log(error);
                    return res.status(409).json({
                      status: 'error',
                      message: 'Something went wrong while sending message'
                    });
                  }

                  return res.status(201).json({
                    status: 'success',
                    message: 'Password Updated successfully',
                    data: info.response
                  });
                });

              case 17:
                _context2.next = 22;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](4);
                return _context2.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'Invalid Token'
                }));

              case 22:
                return _context2.abrupt("return", false);

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 19]]);
      }));

      function confirmReset(_x3, _x4) {
        return _confirmReset.apply(this, arguments);
      }

      return confirmReset;
    }()
  }]);

  return resetController;
}();

exports["default"] = resetController;