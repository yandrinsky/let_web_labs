import express from 'express';
import cors from 'cors';
import { baseRouter } from './baseRouter.js';
import https from 'https';
import fs from 'fs';
import * as bodyParser from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';

const PORT = 8080;
const app = express();

const key = fs.readFileSync('./selfsigned.key');
const cert = fs.readFileSync('./selfsigned.crt');

app.use(express.json());
app.use(cors());
app.use(
  session({
    secret: 'just secret key',
    cookie: {},
    views: 0
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/', baseRouter);

const server = https.createServer(
  {
    key,
    cert
  },
  app
);

server.listen(PORT, () => console.log('Server started on PORT:' + PORT));
