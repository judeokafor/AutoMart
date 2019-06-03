"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _testData = _interopRequireDefault(require("../dataStore/testData"));

var _server = _interopRequireDefault(require("../server"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var expect = _chai["default"].expect;
var auth;

_chai["default"].use(_chaiHttp["default"]);

describe('Testing Automart app', function () {
  describe('Testing the user account creation/signup endpoint', function () {
    it('should create an account succesfully',
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
              return _chai["default"].request(_server["default"]).post('/api/v1/auth/signUp').send(_testData["default"].newUser());

            case 2:
              res = _context.sent;
              expect(res).to.have.status(201);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('data');
              expect(res.body).to.have.property('token');

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    it('should return an already existing user',
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
              return _chai["default"].request(_server["default"]).post('/api/v1/auth/signUp').send(_testData["default"].existingUser());

            case 2:
              res = _context2.sent;
              expect(res).to.have.status(400);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    it('should return a validation error',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3() {
      var res;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _chai["default"].request(_server["default"]).post('/api/v1/auth/signUp').send(_testData["default"].invalidUser());

            case 2:
              res = _context3.sent;
              expect(res).to.have.status(400);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('error');

            case 6:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    })));
  });
  describe('Testing the user account signIn endpoint', function () {
    it('should return password error',
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
              return _chai["default"].request(_server["default"]).post('/api/v1/auth/signIn').send(_testData["default"].signInUserPasswordError());

            case 2:
              res = _context4.sent;
              expect(res).to.have.status(400);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    })));
    it('should return user not found',
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
              return _chai["default"].request(_server["default"]).post('/api/v1/auth/signIn').type('form').send(_testData["default"].strangeUser());

            case 2:
              res = _context5.sent;
              expect(res).to.have.status(404);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    })));
    it('should signIn a user successfully',
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
              return _chai["default"].request(_server["default"]).post('/api/v1/auth/signIn').send(_testData["default"].signInUser());

            case 2:
              res = _context6.sent;
              expect(res).to.have.status(201);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');
              expect(res.body).to.have.property('token');

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
  });
  describe('Testing the logout endpoint', function () {
    it('should log a user out succesfully',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee7() {
      var res;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/auth/logout');

            case 2:
              res = _context7.sent;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    })));
  });
  describe('Testing the authenticated current profile route', function () {
    before(
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var res, token;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _chai["default"].request(_server["default"]).post('/api/v1/auth/signIn').send(_testData["default"].signInUser());

            case 2:
              res = _context8.sent;
              token = res.body.token;
              auth = token;

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it('should get a user profile succesfully',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee9() {
      var res;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/auth/getProfile').set('Authorization', auth);

            case 2:
              res = _context9.sent;
              expect(res).to.have.status(200);
              expect(res).to.have.property('status');

            case 5:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
    it('should return error for the user profile not being authenticated',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee10() {
      var res;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/auth/getProfile');

            case 2:
              res = _context10.sent;
              expect(res).to.have.status(401);

            case 4:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
  });
});