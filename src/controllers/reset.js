import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Joi from 'joi';
import bcrypt from 'bcryptjs';

import User from '../models/User';
import errorHandler from '../lib/helpers/errorHandler';
import Queries from '../lib/helpers/queries';
import db from '../lib/helpers/dbHelpers';
import mail from '../lib/config/nodemailer';

dotenv.config();
export default class resetController {
  static async resetPassword(req, res) {
    try {
      const { email } = req.body;
      const result = Joi.validate(req.body, User.regEmail, { convert: false });
      if (result.error === null) {
        const args = [email];
        const { rowCount, rows } = await db.Query(Queries.searchForEmail, args);
        if (rowCount === 1) {
          const payload = {
            userid: rows[0].userid,
            email: rows[0].email,
          };
          const token = jwt.sign(payload, process.env.SECRET_KEY);
          const url = `https://judeokafor.github.io/AutoMart?token=${token}`;
          const transporter = nodemailer.createTransport(
            mail.transportOptions(),
          );
          await transporter.sendMail(
            mail.MailOptionsReset(rows[0].firstname, url, email),
            (error, info) => {
              if (error) {
                console.log(error);
              }
              return res.status(201).json({
                status: 201,
                message: 'Message sent successfully',
                data: {
                  message: info.response,
                  token,
                },
              });
            },
          );
        } else {
          return res.status(404).json({
            status: 404,
            message: 'User not found',
          });
        }
      } else {
        return errorHandler.validationError(res, result);
      }
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
    return false;
  }

  static async confirmReset(req, res) {
    try {
      const { password, cnfPassword } = req.body;
      const result = Joi.validate(req.body, User.confirmPassword, {
        convert: false,
      });
      if (result.error === null) {
        if (password !== cnfPassword) {
          return res.status(400).json({
            status: 400,
            message: 'Verify your password',
          });
        }
        const { token } = req.query;
        const receivedUser = jwt.verify(token, process.env.SECRET_KEY);
        const { email } = receivedUser;
        const args = [email];
        const { rowCount } = await db.Query(Queries.searchForEmail, args);
        if (rowCount === 1) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(password, salt);
          const args2 = [hash, email];
          const { rows } = await db.Query(Queries.updatePassword, args2);
          const transporter = nodemailer.createTransport(
            mail.transportOptions(),
          );
          await transporter.sendMail(
            mail.MailOptionsConfirm(rows[0].firstname, email),
            (error, info) => {
              if (error) {
                console.log(error);
              }
              return res.status(201).json({
                status: 201,
                message: 'Password Updated successfully',
                data: info.response,
              });
            },
          );
        }
      } else {
        return errorHandler.validationError(res, result);
      }
    } catch (error) {
      errorHandler.tryCatchError(res, error);
    }
    return false;
  }
}
