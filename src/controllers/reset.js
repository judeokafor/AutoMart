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
      const { email } = req.params;
      const { authorization } = req.headers;
      const { password, newPassword } = req.body;
      const result = Joi.validate(email, User.regEmail, { convert: false });
      if (result.error === null) {
        const args = [email];
        const { rows } = await db.Query(Queries.searchForEmail, args);
        if (rows.length === 1) {
          const condition = Object.keys(req.body).length === 0;
          const condition2 = req.body.constructor === Object;
          if (condition && condition2) {
            const transporter = nodemailer.createTransport(
              mail.transportOptions(),
            );
            const randomPassword = Math.random()
              .toString(36)
              .slice(2);
            await transporter.sendMail(
              mail.MailOptionsReset(rows[0].firstname, randomPassword, email),
            );
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(randomPassword, salt);
            const args2 = [hash, email];
            const { rowCount } = await db.Query(Queries.updatePassword, args2);
            if (rowCount === 1) {
              return res.status(204).json({
                status: 204,
                message: 'Message sent and Password Updated successfully',
              });
            }
          }
          if (authorization) {
            const rslt = Joi.validate(
              newPassword,
              Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
              { convert: false },
            );
            if (rslt.error === null) {
              const token = authorization.split(' ')[1];
              const user = jwt.verify(token, process.env.SECRET_KEY);
              if (user.email === email) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(newPassword, salt);
                const args2 = [hash, email];
                const { rowCount } = await db.Query(
                  Queries.updatePassword,
                  args2,
                );
                if (rowCount === 1) {
                  return res.status(204).json({
                    status: 204,
                    message: 'Password Updated successfully',
                  });
                }
              } else {
                return res
                  .status(403)
                  .json({ status: 403, message: 'Cannot make this request' });
              }
            }
            return errorHandler.validationError(res, rslt);
          }
        }
        return res.status(404).json({
          status: 404,
          message: 'User not found',
        });
      }
      return errorHandler.validationError(res, result);
    } catch (error) {
      /* istanbul ignore next */
      errorHandler.tryCatchError(res, error);
    }
    return false;
  }
}
