import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import userStore from '../dataStore/user';
import mail from '../lib/config/nodemailer';

dotenv.config();
export default class resetController {
  static async resetPassword(req, res) {
    const { email } = req.body;
    const verifiedUser = await userStore.find(
      olduser => olduser.email === email,
    );
    if (verifiedUser) {
      const payload = {
        id: verifiedUser.id,
        email: verifiedUser.email,
      };
      const token = jwt.sign(payload, process.env.SECRET_KEY);
      const url = `https://judeokafor.github.io/AutoMart?token=${token}`;
      const transporter = nodemailer.createTransport(mail.transportOptions());
      await transporter.sendMail(
        mail.MailOptionsReset(verifiedUser.firstName, url, email),
        (error, info) => {
          if (error) {
            console.log(error);
            return res.status(409).json({
              status: 'error',
              message: 'Something went wrong while sending message',
            });
          }
          return res.status(201).json({
            status: 'success',
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
        status: 'error',
        message: 'User not found',
      });
    }
    return false;
  }

  static async confirmReset(req, res) {
    const { password, cnfPassword } = req.body;

    if (password !== cnfPassword) {
      return res.status(400).json({
        status: 'error',
        message: 'Verify your password',
      });
    }
    const { token } = req.query;
    try {
      const receivedUser = jwt.verify(token, process.env.SECRET_KEY);
      const { email } = receivedUser;
      const verifiedUser = await userStore.find(
        olduser => olduser.email === email,
      );
      if (verifiedUser) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        verifiedUser.password = hash;
        const transporter = nodemailer.createTransport(mail.transportOptions());
        await transporter.sendMail(
          mail.MailOptionsConfirm(verifiedUser.firstName, email),
          (error, info) => {
            if (error) {
              console.log(error);
              return res.status(409).json({
                status: 'error',
                message: 'Something went wrong while sending message',
              });
            }
            return res.status(201).json({
              status: 'success',
              message: 'Password Updated successfully',
              data: info.response,
            });
          },
        );
      }
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid Token',
      });
    }
    return false;
  }
}
