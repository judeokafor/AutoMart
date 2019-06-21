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
      bodyType: Joi.string().max(30),
      state: Joi.string().required(),
      price: Joi.number()
        .precision(4)
        .required(),
      status: Joi.string(),
      description: Joi.string().max(256),
    });
  }
}
