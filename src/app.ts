import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.get('/evaluation', (req, res) => {

  let queryUrls = req.query?.url;
  res.json({
    message: queryUrls,
  });
});


export default app;