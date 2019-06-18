import Joi from 'joi';

export default class User {
  static get userSchema() {
    return Joi.object({
      lastName: Joi.string()
        .min(2)
        .max(150)
        .required(),
      firstName: Joi.string()
        .min(2)
        .max(150)
        .required(),
      phoneNumber: Joi.string()
        .trim()
        .max(150)
        .required()
        .regex(/^[0-9]{7,10}$/),
      address: Joi.string()
        .trim()
        .max(350),
      gender: Joi.string()
        .max(25)
        .lowercase(),
      email: Joi.string()
        .email()
        .min(3)
        .max(150)
        .required(),
      password: Joi.string()
        .alphanum()
        .min(6)
        .max(30)
        .required(),
      role: Joi.string(),
    });
  }

  static get signInUser() {
    return Joi.object({
      email: Joi.string()
        .email()
        .min(3)
        .max(150)
        .required(),
      password: Joi.string()
        .alphanum()
        .min(6)
        .max(30)
        .required(),
    });
  }

  static get regEmail() {
    return Joi.string()
      .email()
      .min(3)
      .max(150)
      .required();
  }
}
