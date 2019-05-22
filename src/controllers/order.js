import Joi from 'joi';
import Order from '../models/Order';
import errorHandler from '../lib/helpers/errorHandler';
import orderStore from '../dataStore/order';

export default class orderController {
  static createOrder(req, res) {
    const orderData = req.body;
    const result = Joi.validate(orderData, Order.orderSchema, {
      convert: false,
    });
    if (result.error === null) {
      const order = new Order(
        (orderData.id = Math.ceil(
          Math.random() * 100000 * (orderStore.length + 1),
        )),
        orderData.buyer,
        orderData.carId,
        (orderData.status = 'pending'),
        orderData.price,
        orderData.priceOffered,
        (orderData.oldPriceOffered = null),
        (orderData.newPriceOffered = null),
        orderData.createdOn,
      );
      orderStore.push(order);
      return res.status(201).json({
        status: 'success',
        message: 'Created succesfully',
        data: order,
      });
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
