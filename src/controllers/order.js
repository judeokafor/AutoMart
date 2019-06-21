import Joi from 'joi';
import Order from '../models/Order';
import errorHandler from '../lib/helpers/errorHandler';
import Queries from '../lib/helpers/queries';
import db from '../lib/helpers/dbHelpers';

export default class orderController {
  static async createOrder(req, res) {
    try {
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
        return res.status(201).json({
          status: 201,
          message: 'Created succesfully',
          data: rows[0],
        });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
    return false;
  }

  static async updateOrder(req, res) {
    try {
      const { id } = req.params;
      const { price } = req.body;
      const updateNewOrder = {
        id: parseInt(id, 10),
        price: parseInt(price, 10),
      };
      const result = Joi.validate(updateNewOrder, Order.updateOrderSchema, {
        convert: false,
      });
      if (result.error === null) {
        const args = [parseInt(id, 10), 'pending'];
        const { rowCount, rows } = await db.Query(Queries.pendingOrder, args);
        if (rowCount === 1) {
          const oldPriceOffered = rows[0].price_offered;
          const args2 = [
            parseInt(price, 10),
            oldPriceOffered,
            parseInt(id, 10),
            'pending',
          ];
          const results = await db.Query(Queries.updateOrder, args2);
          if (results.rowCount === 1) {
            return res.status(200).json({
              status: 200,
              message: 'Updated Succesfully',
            });
          }
          return res.status(404).json({
            status: 404,
            message: 'Order not found',
          });
        }
        return res.status(404).json({
          status: 404,
          message: 'Order not found',
        });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
    return false;
  }

  static async getAllUserOrders(req, res) {
    try {
      const { userid } = req.user;
      const result = Joi.validate(
        parseInt(userid, 10),
        Joi.number()
          .integer()
          .required(),
        {
          convert: false,
        },
      );
      if (result.error === null) {
        const args = [parseInt(userid, 10), 'pending'];
        const { rowCount, rows } = await db.Query(Queries.userOrder, args);
        if (rowCount > 0) {
          return res.status(200).json({
            status: 200,
            message: 'Pending orders',
            data: rows,
          });
        }
        return res.status(404).json({
          status: 404,
          message: 'Order not found',
        });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
    return false;
  }
}
