require('dotenv').config();
const express = require('express');
const server = express();
const PORT = 3000;

server.use(express.json());

server.get("/api/v1/test", (req, res) => {
    return res.status(200).json({ test: 'Test successful!' });
});
server.use("/api/v1/dishes", require("./routes/dishes.routes"));
server.use("/api/v1/diary", require("./routes/diary.routes"));

server.get("/api/*", (req, res) => {
    return res.sendStatus(404);
});

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
