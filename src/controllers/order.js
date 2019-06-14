import Joi from 'joi';
import Order from '../models/Order';
import errorHandler from '../lib/helpers/errorHandler';
import orderStore from '../dataStore/order';
import Queries from '../lib/helpers/queries';
import db from '../lib/helpers/dbHelpers';

export default class orderController {
  static async createOrder(req, res) {
    const { carId, amount, priceOffered } = req.body;
    const dataToValidate = {
      carId: parseInt(carId, 10),
      amount: parseInt(amount, 10),
      priceOffered: parseInt(priceOffered, 10),
    };
    const result = Joi.validate(dataToValidate, Order.orderSchema, {
      convert: false,
    });
    if (result.error === null) {
      const args = [parseInt(carId, 10), parseInt(req.user.userid, 10)];
      const { rowCount } = await db.Query(Queries.existingOrder, args);
      try {
        if (rowCount > 0) {
          return res.status(400).json({
            status: 400,
            message: 'Order created previously on this car',
          });
        }
        const args2 = [
          'pending',
          amount,
          priceOffered,
          null,
          null,
          parseInt(req.user.userid, 10),
          parseInt(carId, 10),
        ];
        const { rows } = await db.Query(Queries.createOrder, args2);
        try {
          return res.status(201).json({
            status: 201,
            message: 'Created succesfully',
            data: rows[0],
          });
        } catch (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return errorHandler.validationError(res, result);
  }

  static updateOrder(req, res) {
    const { id, price } = req.params;
    const updateNewOrder = {
      id,
      price,
    };
    const result = Joi.validate(updateNewOrder, Order.orderSchema, {
      convert: false,
    });
    if (result.error) {
      const convertedId = parseInt(id, 10);
      const relatedOrder = orderStore.find(
        order => parseInt(order.id, 10) === convertedId && order.status === 'pending',
      );
      if (relatedOrder) {
        relatedOrder.newPriceOffered = price;
        return res.status(200).json({
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
    return errorHandler.validationError(res, result);
  }
}
