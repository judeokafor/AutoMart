import Joi from 'joi';
import Car from '../models/Car';
import carStore from '../dataStore/car';
import cloud from '../lib/config/cloudinaryConfig';

export default class carController {
  static postCarAd(req, res) {
    const carAdData = req.body;
    const results = Joi.validate(carAdData, Car.carSchema, { convert: false });
    if (results.error === null) {
      console.log('continue with app');
    } else {
      console.log(results.error.details[0].message);
    }

    try {
      const verifiedImage = carStore.find(
        oldcar => oldcar.imageName === carAdData.imageName,
      );
      if (verifiedImage) {
        return res.status(400).json({
          status: 'error',
          message: 'File Already Exist',
        });
      }
      cloud(req.files[0].path)
        .then((result) => {
          const imageValues = {
            imageName: req.body.imageName,
            cloudImage: result.url,
            imageId: result.id,
          };
          console.log('the image values from cloudinary', result);
          const car = new Car(
            (carAdData.id = Math.ceil(
              Math.random() * 100000 * (carStore.length + 1),
            )),
            carAdData.owner,
            carAdData.model,
            carAdData.manufacturer,
            carAdData.imageName,
            (carAdData.imageUrl = imageValues.cloudImage),
            carAdData.transmission,
            carAdData.year,
            carAdData.fuelType,
            carAdData.bodyType,
            carAdData.state,
            carAdData.price,
            carAdData.status,
            carAdData.description,
            (carAdData.createdOn = Date.now()),
          );
          // save in array
          carStore.push(car);
          return res.status(201).json({
            status: 'success',
            message: 'Advert Post Created Succesfully',
            data: car,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (exceptions) {
      console.log(exceptions);
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
