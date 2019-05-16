import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import dotenv from 'dotenv';
import passport from 'passport';

import User from '../models/User';
import userStore from '../dataStore/user';

dotenv.config();

export default {
  test: (req, res) => {
    res.json({ message: 'user works' });
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
      (userData.id = Math.ceil(
        Math.random() * 100000 * (userStore.length + 1),
      )),
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
      .json({ status: 'success', token: `Bearer ${token}`, data: payload });
  },
  signIn: (req, res) => {
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
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            avatar: userData.avatar,
            role: userData.role,
            isAdmin: userData.isAdmin,
          };
          jwt.sign(
            payload,
            process.env.SECRET_KEY,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) {
                throw err;
              } else {
                res.status(201).json({
                  status: 'success',
                  message: 'Login Succesful',
                  token: `Bearer ${token}`,
                });
              }
            },
          );
        } else {
          return res.status(400).json({ message: 'Password Incorrect' });
        }
        return false;
      });
    }
  },
  currentProfile: (req, res) => {
    res.status(200).json(req.user);
  },
  logOut: (req, res) => {
    req.logOut();
    res.status(200).json({
      status: 'success',
      message: 'Log out succesfully',
    });
  },
};
