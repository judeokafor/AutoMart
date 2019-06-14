import Joi from 'joi';
export default class Order {
  static get orderSchema() {
    return Joi.object({
      carId: Joi.number()
        .integer()
        .required(),
      amount: Joi.number().required(),
      priceOffered: Joi.number().required(),
    });
  }

  static get updateOrderSchema() {
    return Joi.object({
      price: Joi.number()
        .integer()
        .required(),
      id: Joi.number()
        .integer()
        .required(),
    });
  }
}
