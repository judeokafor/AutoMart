"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _joi = _interopRequireDefault(require("joi"));

var _Car = _interopRequireDefault(require("../models/Car"));

var _car = _interopRequireDefault(require("../dataStore/car"));

var _cloudinaryConfig = _interopRequireDefault(require("../lib/config/cloudinaryConfig"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var carController =
/*#__PURE__*/
function () {
  function carController() {
    _classCallCheck(this, carController);
  }

  _createClass(carController, null, [{
    key: "postCarAd",
    value: function postCarAd(req, res) {
      var carAdData = req.body;

      var results = _joi["default"].validate(carAdData, _Car["default"].carSchema, {
        convert: false
      });

      if (results.error === null) {
        console.log('continue with app');
      } else {
        console.log(results.error.details[0].message);
      }

      try {
        var verifiedImage = _car["default"].find(function (oldcar) {
          return oldcar.imageName === carAdData.imageName;
        });

        if (verifiedImage) {
          return res.status(400).json({
            status: 'error',
            message: 'File Already Exist'
          });
        }

        (0, _cloudinaryConfig["default"])(req.files[0].path).then(function (result) {
          var imageValues = {
            imageName: req.body.imageName,
            cloudImage: result.url,
            imageId: result.id
          };
          console.log('the image values from cloudinary', result);
          var car = new _Car["default"](carAdData.id = Math.ceil(Math.random() * 100000 * (_car["default"].length + 1)), carAdData.owner, carAdData.model, carAdData.manufacturer, carAdData.imageName, carAdData.imageUrl = imageValues.cloudImage, carAdData.transmission, carAdData.year, carAdData.fuelType, carAdData.bodyType, carAdData.state, carAdData.price, carAdData.status, carAdData.description, carAdData.createdOn = Date.now()); // save in array

          _car["default"].push(car);

          return res.status(201).json({
            status: 'success',
            message: 'Advert Post Created Succesfully',
            data: car
          });
        })["catch"](function (err) {
          console.log(err);
        });
      } catch (exceptions) {
        console.log(exceptions);
      }

      return false;
    }
  }, {
    key: "markAsSold",
    value: function markAsSold(req, res) {
      var _req$params = req.params,
          id = _req$params.id,
          status = _req$params.status;
      var data = {
        id: id,
        status: status
      };

      var results = _joi["default"].validate(data, _Car["default"].length, {
        convert: false
      });

      if (results.error === null) {
        console.log('continue with app');
      } else {
        console.log(results.error.details[0].message);
      }

      var relatedOrder = _car["default"].find(function (order) {
        return parseInt(order.id, 10) === parseInt(id, 10);
      });

      if (relatedOrder) {
        relatedOrder.status = status;
        return res.status(200).json({
          status: 'success',
          message: 'Updated succesfully, marked as sold',
          data: relatedOrder
        });
      }

      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }
  }, {
    key: "updateOrderPrice",
    value: function updateOrderPrice(req, res) {
      var _req$params2 = req.params,
          id = _req$params2.id,
          price = _req$params2.price;

      var relatedOrder = _car["default"].find(function (order) {
        return parseInt(order.id, 10) === parseInt(id, 10);
      });

      if (relatedOrder) {
        relatedOrder.price = parseInt(price, 10);
        return res.status(200).json({
          status: 'success',
          message: 'Order Price Updated Succesfully',
          data: relatedOrder
        });
      }

      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }
  }, {
    key: "viewSpecificCar",
    value: function viewSpecificCar(req, res) {
      var id = req.params.id;

      var specificCar = _car["default"].filter(function (order) {
        return parseInt(order.id, 10) === parseInt(id, 10);
      });

      if (specificCar.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: specificCar
        });
      }

      return res.status(404).json({
        status: 'error',
        message: 'Car not found'
      });
    }
  }, {
    key: "viewUnsoldCar",
    value: function viewUnsoldCar(req, res) {
      var status = req.query.status;

      var unSoldCars = _car["default"].filter(function (order) {
        return order.status === status;
      });

      if (unSoldCars.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: unSoldCars
        });
      }

      return res.status(404).json({
        status: 'error',
        message: 'Car not found'
      });
    }
  }, {
    key: "viewUnsoldCarBetweenMaxandMin",
    value: function viewUnsoldCarBetweenMaxandMin(req, res) {
      var _req$query = req.query,
          status = _req$query.status,
          min = _req$query.min,
          max = _req$query.max;

      var unSoldCars = _car["default"].filter(function (order) {
        return order.status === status;
      });

      if (unSoldCars.length > 0) {
        var filteredCars = unSoldCars.filter(function (order) {
          return order.price >= min && order.price <= max;
        });

        if (filteredCars.length > 0) {
          return res.status(200).json({
            status: 'success',
            data: filteredCars
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Car not found'
        });
      }

      return res.status(404).json({
        status: 'error',
        message: 'Car not found'
      });
    }
  }, {
    key: "deleteAdvert",
    value: function deleteAdvert(req, res) {
      var id = req.params.id;

      _car["default"].forEach(function (order, i) {
        if (parseInt(order.id, 10) === parseInt(id, 10)) {
          _car["default"].splice(i, 1);

          return res.status(200).json({
            status: 'success',
            message: 'Advert Deleted Successfully',
            data: _car["default"]
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Car not found'
        });
      });
    }
  }, {
    key: "viewAllAdverts",
    value: function viewAllAdverts(req, res) {
      console.log('the filtered cars');

      var cars = _car["default"].filter(function (order) {
        return order.status === 'available' || order.status === 'sold';
      });

      if (cars.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: cars
        });
      }

      return res.status(404).json({
        status: 'error',
        message: 'not here please'
      });
    }
  }, {
    key: "viewUnsoldCarSpecificMake",
    value: function viewUnsoldCarSpecificMake(req, res) {
      var manufacturer = req.params.manufacturer;

      var unSoldCars = _car["default"].filter(function (order) {
        return order.status === 'available';
      });

      if (unSoldCars.length > 0) {
        var filteredCars = unSoldCars.filter(function (order) {
          return order.manufacturer === manufacturer;
        });

        if (filteredCars.length > 0) {
          return res.status(200).json({
            status: 'success',
            data: filteredCars
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Car not found'
        });
      }

      return res.status(404).json({
        status: 'error',
        message: 'Car not found'
      });
    }
  }, {
    key: "viewNewUnsoldCar",
    value: function viewNewUnsoldCar(req, res) {
      var unSoldCars = _car["default"].filter(function (order) {
        return order.status === 'available';
      });

      if (unSoldCars.length >= 0) {
        var filteredCars = unSoldCars.filter(function (order) {
          return order.state === 'new';
        });

        if (filteredCars.length > 0) {
          return res.status(200).json({
            status: 'success',
            data: filteredCars
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Car not found'
        });
      }

      return res.status(404).json({
        status: 'error',
        message: 'Car not found'
      });
    }
  }, {
    key: "viewUsedUnsoldCar",
    value: function viewUsedUnsoldCar(req, res) {
      var unSoldCars = _car["default"].filter(function (order) {
        return order.status === 'available';
      });

      if (unSoldCars.length >= 0) {
        var filteredCars = unSoldCars.filter(function (order) {
          return order.state === 'used';
        });

        if (filteredCars.length > 0) {
          return res.status(200).json({
            status: 'success',
            data: filteredCars
          });
        }

        return res.status(404).json({
          status: 'error',
          message: 'Car not found'
        });
      }

      return res.status(404).json({
        status: 'error',
        message: 'Car not found'
      });
    }
  }, {
    key: "viewAllWithSpecificBodyType",
    value: function viewAllWithSpecificBodyType(req, res) {
      var bodyType = req.params.bodyType;

      var cars = _car["default"].filter(function (order) {
        return order.bodyType === bodyType;
      });

      if (cars.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: cars
        });
      }

      return res.status(404).json({
        status: 'error',
        message: 'Car not found'
      });
    }
  }]);

  return carController;
}();

exports["default"] = carController;