import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import dotenv from 'dotenv';
import Joi from 'joi';

import User from '../models/User';
import userStore from '../dataStore/user';
import errorHandler from '../lib/helpers/errorHandler';
import Queries from '../lib/helpers/queries';
import db from '../lib/helpers/dbHelpers';

dotenv.config();

export default class userController {
  static test(req, res) {
    res.json({ message: 'user works' });
  }

  static async testdbconnection(req, res) {
    const { rowCount, rows } = await db.Query(Queries.testTable);
    try {
      if (rowCount > 0) {
        return res.json({
          data: rows,
        });
      }
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
    return false;
  }

  static async signUp(req, res) {
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
    const result = Joi.validate(req.body, User.userSchema, { convert: false });
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
      try {
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
          try {
            const payload = {
              userid: rows[0].userid,
              email,
              role,
            };
            const token = jwt.sign(payload, process.env.SECRET_KEY);
            return res
              .status(201)
              .json({ status: 201, token: `Bearer ${token}`, data: payload });
          } catch (error) {
            errorHandler.tryCatchError(res, error);
          }
        }
        return res.status(400).json({
          status: 400,
          message: 'Email Already Exist',
        });
      } catch (error) {
        errorHandler.tryCatchError(res, error);
      }
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
