import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passport from 'passport';
import path from 'path';

import users from './routes/api/user';
import cars from './routes/api/car';
import orders from './routes/api/order';
import flags from './routes/api/flag';

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

app.use('/api/v1/auth', users);
app.use('/api/v1/car', cars);
app.use('/api/v1/order', orders);
app.use('/api/v1/flag', flags);

app.get('/', (req, res) => {
  res.send('Welcome to jude app');
});

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});

export default server;
