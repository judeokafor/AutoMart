import Joi from 'joi';

class Flag {
  constructor(id, carId, reason, description, createdOn, name, email, phone) {
    this.id = id;
    this.carId = carId;
    this.reason = reason;
    this.description = description;
    this.createdOn = createdOn;
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  static get flagSchema() {
    return Joi.object({
      carId: Joi.number()
        .integer()
        .required(),
      reason: Joi.string()
        .trim()
        .min(2)
        .required(),
      description: Joi.string()
        .trim()
        .min(5)
        .required(),
      name: Joi.string()
        .min(2)
        .trim()
        .required(),
      email: Joi.string()
        .email()
        .required(),
      phone: Joi.string()
        .trim()
        .required()
        .regex(/^[0-9]{7,10}$/),
    });
  }
}
export default Flag;
