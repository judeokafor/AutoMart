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

  static async markAsSold(req, res) {
    const { id } = req.params;
    const { status } = req.body;
    const data = {
      id: parseInt(id, 10),
      status,
    };
    const result = Joi.validate(data, Car.markAsSold, { convert: false });
    if (result.error === null) {
      const args = [data.id];
      const { rowCount } = await db.Query(Queries.searchForCarAdById, args);
      try {
        if (rowCount === 1) {
          const args2 = ['sold', data.id];
          const { rows } = await db.Query(Queries.updateCarAsSold, args2);
          try {
            if (rows.length === 1) {
              return res.status(200).json({
                status: 200,
                message: 'Updated succesfully, marked as sold',
              });
            }
          } catch (error) {
            errorHandler.tryCatchError(res, error);
          }
        }
        return res.status(404).json({
          status: 404,
          message: 'Order not found',
        });
      } catch (error) {
        errorHandler.tryCatchError(res, error);
      }
    }
    return errorHandler.validationError(res, result);
  }

  static async updateOrderPrice(req, res) {
    const { id } = req.params;
    const { price } = req.body;

    const data = {
      id: parseInt(id, 10),
      price: parseInt(price, 10),
    };
    const result = Joi.validate(data, Car.updateOrderPrice, { convert: false });
    if (result.error === null) {
      const args = [data.id];
      const { rowCount } = await db.Query(Queries.searchForCarAdById, args);
      try {
        if (rowCount === 1) {
          const args2 = [parseInt(price, 10), data.id];
          const { rows } = await db.Query(Queries.updateCarAsSold, args2);
          try {
            if (rows.length === 1) {
              return res.status(200).json({
                status: 200,
                message: 'Order Price Updated Succesfully',
              });
            }
          } catch (error) {
            errorHandler.tryCatchError(res, error);
          }
        }
        return res.status(404).json({
          status: 404,
          message: 'Order not found',
        });
      } catch (error) {
        errorHandler.tryCatchError(res, error);
      }
    }
    return errorHandler.validationError(res, result);
  }

  static async viewSpecificCar(req, res) {
    const { id } = req.params;
    const Id = parseInt(id, 10);
    const result = Joi.validate(
      Id,
      Joi.number()
        .integer()
        .required(),
      { convert: false },
    );
    if (result.error === null) {
      const args = [Id];
      const { rowCount, rows } = await db.Query(
        Queries.searchForCarAdById,
        args,
      );
      try {
        if (rowCount === 1) {
          return res.status(200).json({
            status: 200,
            data: rows[0],
          });
        }
        return res.status(404).json({
          status: 404,
          message: 'Car not found',
        });
      } catch (error) {
        errorHandler.tryCatchError(res, error);
      }
    }
    return errorHandler.validationError(res, result);
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

  static async cars(req, res) {
    try {
      const {
        status, min, max, state, manufacturer, bodyType,
      } = req.query;
      const { authorization } = req.headers;
      if (authorization) {
        const token = authorization.split(' ')[1];
        const decoded = decode(token);
        if (decoded.role === 'admin') {
          const args = ['available', 'sold'];
          const { rowCount, rows } = await db.Query(
            Queries.allAdvertsSoldAvaliable,
            args,
          );
          if (rowCount > 0) {
            return res.status(200).json({
              status: 200,
              data: rows,
            });
          }
          return res.status(404).json({
            status: 404,
            message: 'Cars not available',
          });
        }
        if (decoded.role !== 'admin') {
          return res.status(401).json({ status: 401, message: 'Unauthorized' });
        }
      }
      if (status && min && max) {
        const data = {
          min: parseInt(min, 10),
          max: parseInt(max, 10),
          status,
        };
        const result = Joi.validate(data, Car.viewUnsoldCarBetweenMaxandMin, {
          convert: false,
        });
        if (result.error === null) {
          const args = [status, min, max];
          const { rowCount, rows } = await db.Query(
            Queries.searchUnsoldCarBetweenMaxandMin,
            args,
          );
          if (rowCount >= 1) {
            return res.status(200).json({
              status: 200,
              data: rows,
            });
          }
          return res.status(404).json({
            status: 404,
            message: 'Car not found',
          });
        }
        return errorHandler.validationError(res, result);
      }
      if (status) {
        const result = Joi.validate(
          status,
          Joi.string()
            .equal('available')
            .required(),
          { convert: false },
        );
        if (result.error === null) {
          const args = [status];
          const { rowCount, rows } = await db.Query(Queries.searchByStatus, args);
          if (rowCount >= 1) {
            return res.status(200).json({
              status: 200,
              data: rows,
            });
          }
          return res.status(404).json({
            status: 404,
            message: 'Car not found',
          });
        }
        return errorHandler.validationError(res, result);
      }
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
    return false;
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

  static async deleteAdvert(req, res) {
    const { id } = req.params;
    const result = Joi.validate(
      parseInt(id, 10),
      Joi.number()
        .integer()
        .required(),
      { convert: false },
    );
    if (result.error === null) {
      const args = [parseInt(id, 10)];
      const { rowCount } = await db.Query(Queries.deleteCarAd, args);
      if (rowCount === 1) {
        return res.status(200).send({
          status: 200,
          message: 'Advert Deleted Successfully',
        });
      }
      return res.status(404).json({
        status: 404,
        message: 'Car not found',
      });
    }
    return errorHandler.validationError(res, result);
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
