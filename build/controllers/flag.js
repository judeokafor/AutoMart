"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _Flag = _interopRequireDefault(require("../models/Flag"));

var _flag = _interopRequireDefault(require("../dataStore/flag"));

var _errorHandler = _interopRequireDefault(require("../lib/helpers/errorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var flagController =
/*#__PURE__*/
function () {
  function flagController() {
    _classCallCheck(this, flagController);
  }

  _createClass(flagController, null, [{
    key: "flagAdvert",
    value: function () {
      var _flagAdvert = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(req, res) {
        var flagData, result, flag, outstandingFlag;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                flagData = req.body;
                result = _joi["default"].validate(flagData, _Flag["default"].flagSchema, {
                  convert: false
                });

                if (!(result.error === null)) {
                  _context.next = 9;
                  break;
                }

                flag = new _Flag["default"](flagData.id = Math.ceil(Math.random() * 100000 * (_flag["default"].length + 1)), flagData.carId, flagData.reason, flagData.description, flagData.createdOn = Date.now(), flagData.name, flagData.email, flagData.phone);
                outstandingFlag = _flag["default"].find(function (olduser) {
                  return olduser.email === flagData.email && olduser.carId === flagData.carId;
                });

                if (!outstandingFlag) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", res.status(400).json({
                  status: 'error',
                  message: 'We are handling previous reports'
                }));

              case 7:
                _flag["default"].push(flag);

                return _context.abrupt("return", res.status(201).json({
                  status: 'success',
                  message: 'Report created succesfully',
                  data: flag
                }));

              case 9:
                return _context.abrupt("return", _errorHandler["default"].validationError(res, result));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function flagAdvert(_x, _x2) {
        return _flagAdvert.apply(this, arguments);
      }

      return flagAdvert;
    }()
  }, {
    key: "viewAllFlags",
    value: function viewAllFlags(req, res) {
      if (_flag["default"].length > 0) {
        return res.status(200).json({
          status: 'success',
          data: _flag["default"]
        });
      }

      return res.status(404).json({
        status: 'error',
        message: 'Reports not found'
      });
    }
  }]);

  return flagController;
}();

exports["default"] = flagController;