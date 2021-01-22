require('dotenv').config();
const express = require('express');
const router = require('./router');

const server = express();
const PORT = 3000;

server.use(express.json());

server.use("/api/v1", router);

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
