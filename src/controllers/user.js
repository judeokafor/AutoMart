import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import dotenv from 'dotenv';
import Joi from 'joi';

import User from '../models/User';
import userStore from '../dataStore/user';
import errorHandler from '../lib/helpers/errorHandler';

dotenv.config();

export default class userController {
  static test(req, res) {
    res.json({ message: 'user works' });
  }

  static signUp(req, res) {
    const userData = req.body;

    const result = Joi.validate(userData, User.userSchema, { convert: false });
    if (result.error === null) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(userData.password, salt);
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
      });
      const user = new User(
        (userData.id = Math.ceil(
          Math.random() * 100000 * (userStore.length + 1),
        )),
        userData.firstName,
        userData.lastName,
        userData.phoneNumber,
        userData.address,
        userData.gender,
        userData.email,
        (userData.password = hash),
        (userData.avatar = avatar),
        userData.isAdmin,
        userData.role,
      );
      const verifiedUser = userStore.find(
        olduser => olduser.email === userData.email,
      );
      if (verifiedUser) {
        return res.status(400).json({
          status: 'error',
          message: 'Email Already Exist',
        });
      }
      userStore.push(user);
      const payload = {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY);
      return res
        .status(201)
        .json({ status: 'success', token: `Bearer ${token}`, data: user });
    }
    return errorHandler.validationError(res, result);
  }

  static signIn(req, res) {
    const userData = req.body;
    const verifiedUser = userStore.find(
      databaseUser => databaseUser.email === userData.email,
    );
    if (!verifiedUser) {
      res.status(404).json({ status: 'error', message: 'User Not Found' });
    } else {
      bcrypt.compare(userData.password, verifiedUser.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: userData.id,
            email: userData.email,
            isAdmin: userData.isAdmin,
          };
          jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
            if (err) {
              throw err;
            } else {
              res.status(201).json({
                status: 'success',
                message: 'Login Succesful',
                token: `Bearer ${token}`,
              });
            }
          });
        } else {
          return res
            .status(400)
            .json({ status: 'error', message: 'Password Incorrect' });
        }
        return false;
      });
    }
  }

  static currentProfile(req, res) {
    if (req.user) {
      return res.status(200).json({ status: 'success', data: req.user });
    }
    return false;
  }

  static logOut(req, res) {
    req.logOut();
    res.status(200).json({
      status: 'success',
      message: 'Log out succesfully',
    });
  }
}
