const express = require('express');
const router = require('./router');
const cors = require('cors');
const functions = require('firebase-functions');

const server = express();
// const PORT = 3080;

const whitelist = ['http://localhost:3000', 'http://localhost:3080', 'https://climatediet.sg'];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'device-remember-token',
    'Access-Control-Allow-Origin',
    'Origin',
    'Accept',
  ],
};

server.use(cors(corsOptions));

server.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  next();
});

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api/v1', router);

exports.climateDiet = functions.https.onRequest(server);
