"use strict";

var _chai = _interopRequireDefault(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _server = _interopRequireDefault(require("../server"));

var _testData = _interopRequireDefault(require("../dataStore/testData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var auth;
var expect = _chai["default"].expect;

_chai["default"].use(_chaiHttp["default"]);

describe('Testing the car advert placement route', function () {
  before(
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var res, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _chai["default"].request(_server["default"]).post('/api/v1/auth/signIn').send(_testData["default"].signInUser());

          case 2:
            res = _context.sent;
            token = res.body.token;
            auth = token;

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  describe('should upload image to cloudinary and create a post', function () {
    it('should return an error if image name already exist',
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
              return _chai["default"].request(_server["default"]).post('/api/v1/car').set('Authorization', auth).send({
                imageName: 'my_redcar.png'
              });

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
              return _chai["default"].request(_server["default"]).post('/api/v1/car').set('Authorization', auth).send(_testData["default"].errorCarAdvert());

            case 2:
              res = _context3.sent;
              expect(res).to.have.status(400);
              expect(res.body).to.have.property('status');

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))); // it('should create an advert successfully', async () => {
    //   const res = await chai
    //     .request(server)
    //     .post('/api/v1/car')
    //     .type('form')
    //     .send(testData.carAdvert());
    //   expect(res).to.have.status(201);
    //   expect(res.body).to.have.property('status');
    //   expect(res.body).to.have.property('message');
    //   expect(res.body).to.have.property('data');
    // });
  });
  describe('should mark an advert as sold', function () {
    it('should mark an order as sold',
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
              return _chai["default"].request(_server["default"]).put('/api/v1/car/4444/sold').set('Authorization', auth);

            case 2:
              res = _context4.sent;
              expect(res).to.have.status(200);
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
    it('should return an error if an order doesnt exist',
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
              return _chai["default"].request(_server["default"]).put('/api/v1/car/111111/sold').set('Authorization', auth);

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
  });
  describe('should update the price of an order ', function () {
    it('should update the price of an order successfully',
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
              return _chai["default"].request(_server["default"]).put('/api/v1/car/4444/1000000').set('Authorization', auth);

            case 2:
              res = _context6.sent;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');
              expect(res.body).to.have.property('data');

            case 7:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    })));
    it('should return an error if it doesnt exist',
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
              return _chai["default"].request(_server["default"]).put('/api/v1/car/4411144/1000000').set('Authorization', auth);

            case 2:
              res = _context7.sent;
              expect(res).to.have.status(404);
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
  describe('should get details of a specific car', function () {
    it('should mark an order as sold',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8() {
      var res;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car/4444');

            case 2:
              res = _context8.sent;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));
    it('should return an error if it doesnt exist',
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
              return _chai["default"].request(_server["default"]).get('/api/v1/car/4411144');

            case 2:
              res = _context9.sent;
              expect(res).to.have.status(404);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));
  });
  describe('should get details of all unsold cars', function () {
    it('should get all cars that has status of available',
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
              return _chai["default"].request(_server["default"]).get('/api/v1/car/view?status=available');

            case 2:
              res = _context10.sent;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10);
    })));
    it('should return an error if it doesnt exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee11() {
      var res;
      return regeneratorRuntime.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car/view?status=availablessss');

            case 2:
              res = _context11.sent;
              expect(res).to.have.status(404);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    })));
  });
  describe('should get details of all unsold cars within a particular range', function () {
    it('should get all cars that has status of available within a range',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee12() {
      var res;
      return regeneratorRuntime.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car?status=available&min=1000000&max=1500000');

            case 2:
              res = _context12.sent;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    })));
    it('should return an error if it doesnt exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee13() {
      var res;
      return regeneratorRuntime.wrap(function _callee13$(_context13) {
        while (1) {
          switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car?status=available&min=10&max=150');

            case 2:
              res = _context13.sent;
              expect(res).to.have.status(404);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context13.stop();
          }
        }
      }, _callee13);
    })));
  });
  describe('delete a particular advert', function () {
    it('should delete a particular advert if authencticated as an admin and user',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee14() {
      var res;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              _context14.next = 2;
              return _chai["default"].request(_server["default"])["delete"]('/api/v1/car/deleteAdvert/4444').set('Authorization', auth);

            case 2:
              res = _context14.sent;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('message');

            case 6:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14);
    })));
    it('should return an error if it doesnt exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee15() {
      var res;
      return regeneratorRuntime.wrap(function _callee15$(_context15) {
        while (1) {
          switch (_context15.prev = _context15.next) {
            case 0:
              _context15.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car/deleteAdvert/4').set('Authorization', auth);

            case 2:
              res = _context15.sent;
              expect(res).to.have.status(404);

            case 4:
            case "end":
              return _context15.stop();
          }
        }
      }, _callee15);
    })));
  });
  describe('view all adverts as an admin', function () {
    it('view all adverts succesfully',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee16() {
      var res;
      return regeneratorRuntime.wrap(function _callee16$(_context16) {
        while (1) {
          switch (_context16.prev = _context16.next) {
            case 0:
              _context16.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car/viewAllAdverts').set('Authorization', auth);

            case 2:
              res = _context16.sent;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context16.stop();
          }
        }
      }, _callee16);
    })));
    it('should return an error if not authorized',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee17() {
      var res;
      return regeneratorRuntime.wrap(function _callee17$(_context17) {
        while (1) {
          switch (_context17.prev = _context17.next) {
            case 0:
              _context17.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car/viewAllAdverts');

            case 2:
              res = _context17.sent;
              expect(res).to.have.status(401);

            case 4:
            case "end":
              return _context17.stop();
          }
        }
      }, _callee17);
    })));
  });
  describe('should get details of all unsold cars of a particular manufacturer', function () {
    it('should get all cars from a particular manufacturer successfully',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee18() {
      var res;
      return regeneratorRuntime.wrap(function _callee18$(_context18) {
        while (1) {
          switch (_context18.prev = _context18.next) {
            case 0:
              _context18.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car/viewUnsoldCarsWithMake/Toyota');

            case 2:
              res = _context18.sent;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context18.stop();
          }
        }
      }, _callee18);
    })));
    it('should return an error if it doesnt exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee19() {
      var res;
      return regeneratorRuntime.wrap(function _callee19$(_context19) {
        while (1) {
          switch (_context19.prev = _context19.next) {
            case 0:
              _context19.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car/viewUnsoldCarsWithMake/Toy');

            case 2:
              res = _context19.sent;
              expect(res).to.have.status(404);

            case 4:
            case "end":
              return _context19.stop();
          }
        }
      }, _callee19);
    })));
  });
  describe('should get all new unsold cars', function () {
    it('should get all new unsold cars successfully',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee20() {
      var res;
      return regeneratorRuntime.wrap(function _callee20$(_context20) {
        while (1) {
          switch (_context20.prev = _context20.next) {
            case 0:
              _context20.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car/new');

            case 2:
              res = _context20.sent;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context20.stop();
          }
        }
      }, _callee20);
    })));
    it('should return an error if it doesnt exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee21() {
      var res;
      return regeneratorRuntime.wrap(function _callee21$(_context21) {
        while (1) {
          switch (_context21.prev = _context21.next) {
            case 0:
              _context21.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car/newz');

            case 2:
              res = _context21.sent;
              expect(res).to.have.status(404);

            case 4:
            case "end":
              return _context21.stop();
          }
        }
      }, _callee21);
    })));
  });
  describe('should get all new used cars', function () {
    it('should get all new used cars successfully',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee22() {
      var res;
      return regeneratorRuntime.wrap(function _callee22$(_context22) {
        while (1) {
          switch (_context22.prev = _context22.next) {
            case 0:
              _context22.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car/used');

            case 2:
              res = _context22.sent;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context22.stop();
          }
        }
      }, _callee22);
    })));
    it('should return an error if it doesnt exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee23() {
      var res;
      return regeneratorRuntime.wrap(function _callee23$(_context23) {
        while (1) {
          switch (_context23.prev = _context23.next) {
            case 0:
              _context23.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car/usedz');

            case 2:
              res = _context23.sent;
              expect(res).to.have.status(404);

            case 4:
            case "end":
              return _context23.stop();
          }
        }
      }, _callee23);
    })));
  });
  describe('should get details of all unsold cars of a particular body type', function () {
    it('should get all cars from a particular body type successfully',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee24() {
      var res;
      return regeneratorRuntime.wrap(function _callee24$(_context24) {
        while (1) {
          switch (_context24.prev = _context24.next) {
            case 0:
              _context24.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car/viewAllWithSpecificBodyType/Sedan');

            case 2:
              res = _context24.sent;
              expect(res).to.have.status(200);
              expect(res.body).to.have.property('status');
              expect(res.body).to.have.property('data');

            case 6:
            case "end":
              return _context24.stop();
          }
        }
      }, _callee24);
    })));
    it('should return an error if it doesnt exist',
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee25() {
      var res;
      return regeneratorRuntime.wrap(function _callee25$(_context25) {
        while (1) {
          switch (_context25.prev = _context25.next) {
            case 0:
              _context25.next = 2;
              return _chai["default"].request(_server["default"]).get('/api/v1/car/viewAllWithSpecificBodyType/Sedanzzz');

            case 2:
              res = _context25.sent;
              expect(res).to.have.status(404);

            case 4:
            case "end":
              return _context25.stop();
          }
        }
      }, _callee25);
    })));
  });
});