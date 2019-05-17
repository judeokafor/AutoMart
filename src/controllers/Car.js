import Car from '../models/Car';
import carStore from '../dataStore/car';
import cloud from '../lib/config/cloudinaryConfig';

export default class carController {
  static postCarAd(req, res) {
    try {
      const carAdData = req.body;

      const verifiedImage = carStore.find(
        oldcar => oldcar.imageName === carAdData.imageName,
      );
      if (verifiedImage) {
        return res.status(400).json({
          status: 'error',
          message: 'File Already Exist',
        });
      }
      console.log('the requested file', req.files[0].path);
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
            message: 'Car Post Created Succesfully',
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
    const carAdData = req.body;
    const relatedOrder = carStore.find(
      order => parseInt(order.id, 10) === parseInt(carAdData.id, 10),
    );
    if (relatedOrder) {
      relatedOrder.status = 'sold';
      return res.status(204).json({
        status: 'success',
        message: 'Updated Succesfully',
        data: relatedOrder,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Order not found',
    });
  }

  static updateOrderPrice(req, res) {
    const carAdData = req.body;
    const relatedOrder = carStore.find(
      order => parseInt(order.id, 10) === parseInt(carAdData.id, 10),
    );
    if (relatedOrder) {
      relatedOrder.price = parseInt(req.body.price, 10);
      return res.status(204).json({
        status: 'success',
        message: 'Updated Succesfully',
        data: relatedOrder,
      });
    }
    return res.status(404).json({
      status: 'error',
      message: 'Order not found',
    });
  }

  static viewSpecificCar(req, res) {
    const carId = req.params.id;
    const specificCar = carStore.filter(
      order => parseInt(order.id, 10) === parseInt(carId, 10),
    );
    console.log('specific car', specificCar);
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
}
