const express = require('express');

const server = express();

const port = process.env.PORT || 3000;

server.get('/', (req, res) => {
  res.send('Welcome to API tests');
});

server.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
