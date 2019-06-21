import Joi from 'joi';
import decode from 'jwt-decode';
import Car from '../models/Car';
import carStore from '../dataStore/car';
import cloud from '../lib/config/cloudinaryConfig';
import Queries from '../lib/helpers/queries';
import db from '../lib/helpers/dbHelpers';
import errorHandler from '../lib/helpers/errorHandler';

export default class carController {
  static async postCarAd(req, res) {
    const {
      price,
      year,
      model,
      manufacturer,
      transmission,
      imageUrl,
      fuelType,
      bodyType,
      state,
      status,
      description,
    } = req.body;
    const { userid } = req.user;
    const dataToValidate = {
      owner: parseInt(userid, 10),
      price: parseInt(price, 10),
      year: parseInt(year, 10),
      model,
      manufacturer,
      transmission,
      fuelType,
      bodyType,
      state,
      status,
      description,
    };
    const result = Joi.validate(dataToValidate, Car.carSchema, {
      convert: false,
    });
    if (result.error === null) {
      const args = [imageUrl];
      const { rowCount } = await db.Query(Queries.searchForImageUrl, args);
      try {
        if (rowCount === 0) {
          const rslt = await cloud(req.files[0].path);
          try {
            const imageValues = {
              imageName: req.files[0].originalname,
              cloudImage: rslt.url,
              imageId: rslt.id,
            };
            const args2 = [
              model,
              manufacturer,
              imageValues.cloudImage,
              imageValues.imageId,
              transmission,
              year,
              fuelType,
              bodyType,
              state,
              price,
              'avaliable',
              description,
              parseInt(userid, 10),
            ];
            const { rows } = await db.Query(Queries.insertCars, args2);
            try {
              if (rows.length === 1) {
                return res.status(201).json({
                  status: 201,
                  message: 'Advert Post Created Succesfully',
                  data: rows[0],
                });
              }
              return res.status(409).json({
                status: 409,
                message: 'Something went wrong while storing at the db',
              });
            } catch (error) {
              errorHandler.tryCatchError(res, error);
            }
          } catch (error) {
            errorHandler.tryCatchError(res, error);
          }
        } else {
          return res.status(400).json({
            status: 400,
            message: 'File Already Exist',
          });
        }
      } catch (error) {
        errorHandler.tryCatchError(res, error);
      }
    } else {
      return errorHandler.validationError(res, result);
    }
    return false;
  }

  static markAsSold(req, res) {
    const { id, status } = req.params;
    const data = {
      id,
      status,
    };
    const results = Joi.validate(data, Car.length, { convert: false });
    if (results.error === null) {
      console.log('continue with app');
    } else {
      console.log(results.error.details[0].message);
    }

    const relatedOrder = carStore.find(
      order => parseInt(order.id, 10) === parseInt(id, 10),
    );
    if (relatedOrder) {
      relatedOrder.status = status;
      return res.status(200).json({
        status: 'success',
        message: 'Updated succesfully, marked as sold',
        data: relatedOrder,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Order not found',
    });
  }

  static updateOrderPrice(req, res) {
    const { id, price } = req.params;
    const relatedOrder = carStore.find(
      order => parseInt(order.id, 10) === parseInt(id, 10),
    );
    if (relatedOrder) {
      relatedOrder.price = parseInt(price, 10);
      return res.status(200).json({
        status: 'success',
        message: 'Order Price Updated Succesfully',
        data: relatedOrder,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Order not found',
    });
  }

  static viewSpecificCar(req, res) {
    const { id } = req.params;
    const specificCar = carStore.filter(
      order => parseInt(order.id, 10) === parseInt(id, 10),
    );
    if (specificCar.length > 0) {
      return res.status(200).json({
        status: 'success',
        data: specificCar,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Car not found',
    });
  }

  static viewUnsoldCar(req, res) {
    const { status } = req.query;
    const unSoldCars = carStore.filter(order => order.status === status);
    if (unSoldCars.length > 0) {
      return res.status(200).json({
        status: 'success',
        data: unSoldCars,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Car not found',
    });
  }

  static viewUnsoldCarBetweenMaxandMin(req, res) {
    const { status, min, max } = req.query;
    const unSoldCars = carStore.filter(order => order.status === status);
    if (unSoldCars.length > 0) {
      const filteredCars = unSoldCars.filter(
        order => order.price >= min && order.price <= max,
      );
      if (filteredCars.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: filteredCars,
        });
      }
      return res.status(404).json({
        status: 'error',
        message: 'Car not found',
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Car not found',
    });
  }

  static deleteAdvert(req, res) {
    const { id } = req.params;
    carStore.forEach((order, i) => {
      if (parseInt(order.id, 10) === parseInt(id, 10)) {
        carStore.splice(i, 1);
        return res.status(200).json({
          status: 'success',
          message: 'Advert Deleted Successfully',
          data: carStore,
        });
      }
      return res.status(404).json({
        status: 'error',
        message: 'Car not found',
      });
    });
  }

  static viewAllAdverts(req, res) {
    console.log('the filtered cars');
    const cars = carStore.filter(
      order => order.status === 'available' || order.status === 'sold',
    );

    if (cars.length > 0) {
      return res.status(200).json({
        status: 'success',
        data: cars,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'not here please',
    });
  }

  static viewUnsoldCarSpecificMake(req, res) {
    const { manufacturer } = req.params;
    const unSoldCars = carStore.filter(order => order.status === 'available');
    if (unSoldCars.length > 0) {
      const filteredCars = unSoldCars.filter(
        order => order.manufacturer === manufacturer,
      );
      if (filteredCars.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: filteredCars,
        });
      }
      return res.status(404).json({
        status: 'error',
        message: 'Car not found',
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Car not found',
    });
  }

  static viewNewUnsoldCar(req, res) {
    const unSoldCars = carStore.filter(order => order.status === 'available');
    if (unSoldCars.length >= 0) {
      const filteredCars = unSoldCars.filter(order => order.state === 'new');
      if (filteredCars.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: filteredCars,
        });
      }
      return res.status(404).json({
        status: 'error',
        message: 'Car not found',
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Car not found',
    });
  }

  static viewUsedUnsoldCar(req, res) {
    const unSoldCars = carStore.filter(order => order.status === 'available');
    if (unSoldCars.length >= 0) {
      const filteredCars = unSoldCars.filter(order => order.state === 'used');
      if (filteredCars.length > 0) {
        return res.status(200).json({
          status: 'success',
          data: filteredCars,
        });
      }
      return res.status(404).json({
        status: 'error',
        message: 'Car not found',
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Car not found',
    });
  }

  static viewAllWithSpecificBodyType(req, res) {
    const { bodyType } = req.params;
    const cars = carStore.filter(order => order.bodyType === bodyType);
    if (cars.length > 0) {
      return res.status(200).json({
        status: 'success',
        data: cars,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Car not found',
    });
  }
}
