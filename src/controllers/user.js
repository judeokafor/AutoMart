import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import dotenv from 'dotenv';

import User from '../models/User';
import userStore from '../dataStore/user';

dotenv.config();

export default {
  test: (req, res) => {
    res.json({ msg: 'user works' });
  },
  signUp: (req, res) => {
    const userData = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userData.password, salt);
    const avatar = gravatar.url(req.body.email, {
      s: '200',
      r: 'pg',
      d: 'mm',
    });
    const user = new User(
      (userData.id = Math.floor(Math.random() * (userStore.length + 1))),
      userData.firstName,
      userData.lastName,
      userData.phoneNumber,
      userData.gender,
      userData.email,
      (userData.password = hash),
      (userData.avatar = avatar),
      (userData.isAdmin = false),
      (userData.role = 'buyer'),
    );
    if (userStore.find(olduser => olduser.email === userData.email)) {
      return res.status(400).json({
        status: 'error',
        message: 'Email Already Exist',
      });
    }
    userStore.push(user);
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      isAdmin: user.isAdmin,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    return res
      .status(201)
      .json({ status: 'success', token: `Bearer ${token}`, payload });
    // const token = jwt.sign(
    //   payload,
    //   keys.secret,
    //   { expiresIn: 3600 },
    //   (err, token) => {
    //     if (err) {
    //       throw err;
    //     } else {
    //       res.status(201).json({
    //         payload,
    //         success: true,
    //         token: `Bearer ${token}`,
    //       });
    //     }
    //   },
    // );
  },
};
