import Joi from 'joi';

class User {
  constructor(
    id,
    firstName,
    lastName,
    phoneNumber,
    address,
    gender,
    email,
    password,
    avatar,
    isAdmin,
    role,
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.gender = gender;
    this.email = email;
    this.password = password;
    this.avatar = avatar;
    this.isAdmin = isAdmin;
    this.role = role;
  }

  static get userSchema() {
    return Joi.object({
      lastName: Joi.string()
        .min(2)
        .required(),
      firstName: Joi.string()
        .min(2)
        .required(),
      phoneNumber: Joi.string()
        .trim()
        .required()
        .regex(/^[0-9]{7,10}$/),
      address: Joi.string()
        .trim()
        .max(100),
      gender: Joi.string().lowercase(),
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .alphanum()
        .min(6)
        .max(16)
        .required(),
      isAdmin: Joi.bool().required(),
      role: Joi.string(),
    });
  }
}
export default User;
