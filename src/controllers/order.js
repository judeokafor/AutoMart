import Order from '../models/Order';
import orderStore from '../dataStore/order';

export default class orderController {
  static createOrder(req, res) {
    const orderData = req.body;
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
    return res
      .status(201)
      .json({ status: 'success', message: 'Created succesfully', data: order });
  }
}
