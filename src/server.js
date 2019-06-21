import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import path from 'path';
import '@babel/polyfill/noConflict';

import users from './routes/api/user';
import cars from './routes/api/car';
import orders from './routes/api/order';
import flags from './routes/api/flag';
import reset from './routes/api/reset';

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

app.use(morgan('dev'));

app.use(passport.initialize());
require('./lib/config/passport')(passport);

app.use('/api/v2/auth', users);
app.use('/api/v2/car', cars);
app.use('/api/v2/order', orders);
app.use('/api/v2/flag', flags);
app.use('/api/v2/users', reset);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});

export default server;
