import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Welcome to jude app');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server Started at Port : ${PORT}`);
});
