import Joi from 'joi';

export default class Car {
  static get carSchema() {
    return Joi.object({
      owner: Joi.number()
        .integer()
        .required(),
      model: Joi.string()
        .trim()
        .required(),
      manufacturer: Joi.string()
        .trim()
        .required(),
      transmission: Joi.string(),
      year: Joi.number().integer(4),
      fuelType: Joi.string().max(10),
      bodyType: Joi.string().max(50),
      state: Joi.string().required(),
      price: Joi.number()
        .precision(4)
        .required(),
      status: Joi.string(),
      description: Joi.string().max(256),
    });
  }

  static get markAsSold() {
    return Joi.object({
      id: Joi.number()
        .integer()
        .required(),
      status: Joi.string()
        .equal('sold')
        .required(),
    });
  }

  static get updateOrderPrice() {
    return Joi.object({
      id: Joi.number()
        .integer()
        .required(),
      price: Joi.number()
        .integer()
        .required(),
    });
  }

  static get viewUnsoldCarBetweenMaxandMin() {
    return Joi.object({
      status: Joi.string()
        .max(15)
        .required(),
      min: Joi.number()
        .integer()
        .positive(),
      max: Joi.number()
        .integer()
        .positive(),
    });
  }
}
