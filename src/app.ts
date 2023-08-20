import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { groupAndCount, groupAndSum, reduceMax, reduceMin } from './util';
import csv from 'csv-parser';
import needle from 'needle';
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

let resultAllData: Array<any> = [];
const year = 2013;
const topic = 'Internal Security';

app.get('/evaluation', async (req, res) => {

  resultAllData = [];

  const queryUrls: any = req.query?.url;

  for (const url of queryUrls) {
    await parseCsv(url);
  }

  const mostSpeechess = groupAndCount(resultAllData.filter(item => item[' Date'].includes(year)), 'Speaker');
  const speakerGroupedCounts = groupAndCount(resultAllData.filter(item => item[' Topic'].includes(topic)), "Speaker");

  res.json({
    mostSpeeches: reduceMax(mostSpeechess)['Speaker'],
    mostSecurity: reduceMax(speakerGroupedCounts)['Speaker'],
    leastWordy: reduceMin(groupAndSum(resultAllData))['Speaker'],
  });
});

async function parseCsv(url: string) {

  await new Promise((resolve, reject) => {
    needle.get(url).pipe(csv())
      .on('data', (data: any) => {
        resultAllData.push(data);
      })
      .on('end', () => { resolve(resultAllData) });
  });

}


export default app;