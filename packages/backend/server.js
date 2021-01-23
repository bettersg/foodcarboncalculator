// import path from 'path';
// import { config } from 'dotenv';
// config({ path: path.resolve(__dirname, '/.env') });
// require('dotenv').config();

// console.log(process.env);
import express from 'express';
import router from './router';
// console.log(__dirname);
//{ path: path.resolve(__dirname, '/.env') }

const server = express();
const PORT = 3080;

server.use(express.json());

server.use('/api/v1', router);

server.listen(PORT, () => {
  console.info(`Listening on port ${PORT}`);
});
