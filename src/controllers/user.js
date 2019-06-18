/* eslint-disable consistent-return */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import dotenv from 'dotenv';
import Joi from 'joi';

import User from '../models/User';
import errorHandler from '../lib/helpers/errorHandler';
import Queries from '../lib/helpers/queries';
import db from '../lib/helpers/dbHelpers';

dotenv.config();

export default class userController {
  static async signUp(req, res) {
    try {
      const {
        firstName,
        lastName,
        phoneNumber,
        address,
        gender,
        email,
        password,
        role,
      } = req.body;
      const result = Joi.validate(req.body, User.userSchema, {
        convert: false,
      });
      if (result.error === null) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const avatar = gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        });
        const args = [email];
        const { rowCount } = await db.Query(Queries.searchForEmail, args);
        if (rowCount === 0) {
          const args2 = [
            firstName,
            lastName,
            phoneNumber,
            hash,
            address,
            gender,
            email,
            avatar,
            false,
            role,
          ];
          const { rows } = await db.Query(Queries.insertUsers, args2);
          const payload = {
            userid: rows[0].userid,
            email,
            role,
          };
          const token = jwt.sign(payload, process.env.SECRET_KEY);
          return res
            .status(201)
            .json({ status: 201, token: `Bearer ${token}`, data: payload });
        }
        return res.status(400).json({
          status: 400,
          message: 'Email Already Exist',
        });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      /* istanbul ignore next */
      errorHandler.tryCatchError(res, error);
    }
  }

  static async signIn(req, res) {
    try {
      const { email, password } = req.body;
      const result = Joi.validate(req.body, User.signInUser, {
        convert: false,
      });
      if (result.error === null) {
        const args = [email];
        const { rowCount, rows } = await db.Query(Queries.searchForEmail, args);
        if (rowCount === 1) {
          const validPassword = await bcrypt.compare(
            password,
            rows[0].password,
          );
          if (validPassword) {
            const payload = {
              id: rows[0].userid,
              email: rows[0].email,
              isAdmin: rows[0].isAdmin,
              role: rows[0].role,
            };
            jwt.sign(payload, process.env.SECRET_KEY, (err, token) => {
              if (err) {
                /* istanbul ignore next */
                console.log(err);
              } else {
                return res.status(201).json({
                  status: 201,
                  message: 'Login Succesful',
                  token: `Bearer ${token}`,
                  role: rows[0].role,
                  isAdmin: rows[0].isAdmin,
                });
              }
            });
          } else {
            return res
              .status(400)
              .json({ status: 400, message: 'Password Incorrect' });
          }
        } else {
          return res
            .status(404)
            .json({ status: 404, message: 'User Not Found' });
        }
      } else {
        return errorHandler.validationError(res, result);
      }
    } catch (error) {
      /* istanbul ignore next */
      errorHandler.tryCatchError(res, error);
    }
  }

  static currentProfile(req, res) {
    if (req.user) {
      return res.status(200).json({ status: 200, data: req.user });
    }
  }

  static logOut(req, res) {
    req.logOut();
    res.status(200).json({
      status: 'success',
      message: 'Log out succesfully',
    });
  }
}
