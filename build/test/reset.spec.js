"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _testData = _interopRequireDefault(require("../dataStore/testData"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var auth;
var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

describe('Testing the reset password functionality', function () {
  describe('Test the password reactivation', function () {
    it('should send password reset to email',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var res;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _chai["default"].request(_server["default"]).post('/api/v1/reset/resetPassword').type('form').send({
                email: 'okaforjudechukwuebuka@gmail.com'
              });

            case 2:
              res = _context.sent;
              expect(res).to.have.status(201);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('data');
              expect(res.body).to.have.property('message');

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should return an error user not found',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee2() {
      var res;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _chai["default"].request(_server["default"]).post('/api/v1/reset/resetPassword').type('form').send({
                email: 'notfound@gmail.com'
              });

            case 2:
              res = _context2.sent;
              expect(res).to.have.status(404);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))); // test for sending email to return status of 409
  });
  describe('Test the confirm password route', function () {
    before('it should send a mail for request a new password',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var res, token;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _chai["default"].request(_server["default"]).post('/api/v1/reset/resetPassword').type('form').send({
                email: 'okaforjudechukwuebuka@gmail.com'
              });

            case 2:
              res = _context3.sent;
              token = res.body.data.token;
              auth = token;

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
    it('should reset password successfully',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var res;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _chai["default"].request(_server["default"]).post("/api/v1/reset/confirmReset/?token=".concat(auth)).type('form').send(_testData["default"].resetPasswordTrue());

            case 2:
              res = _context4.sent;
              expect(res).to.have.status(201);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');
              expect(res.body).to.have.property('data');

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should return error if password not equal to confirm password',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5() {
      var res;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _chai["default"].request(_server["default"]).post("/api/v1/reset/confirmReset/?token=".concat(auth)).type('form').send(_testData["default"].resetPasswordError());

            case 2:
              res = _context5.sent;
              expect(res).to.have.status(400);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should return an error if unauthorized user',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee6() {
      var res;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return _chai["default"].request(_server["default"]).post('/api/v1/reset/resetPassword').type('form').send(_testData["default"].resetPasswordTrue());

            case 2:
              res = _context6.sent;
              expect(res).to.have.status(404);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
});