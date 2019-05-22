import Joi from 'joi';
class Order {
  constructor(
    id,
    buyer,
    carId,
    createdOn,
    status,
    priceOffered,
    oldPriceOffered,
    newPriceOffered,
  ) {
    this.id = id;
    this.buyer = buyer;
    this.carId = carId;
    this.createdOn = createdOn;
    this.status = status;
    this.priceOffered = priceOffered;
    this.oldPriceOffered = oldPriceOffered;
    this.newPriceOffered = newPriceOffered;
  }

  static get orderSchema() {
    return Joi.object({
      buyer: Joi.number()
        .integer()
        .required(),
      carId: Joi.number()
        .integer()
        .required(),
      price: Joi.number().required(),
      priceOffered: Joi.number().required(),
    });
  }

  static get updateOrderSchema() {
    return Joi.object({
      price: Joi.number().required(),
      id: Joi.number()
        .integer()
        .required(),
    });
  }
}
export default Order;
