const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = express();
const db = mongoose.connect('mongodb://localhost/bookAPI',{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const port = process.env.PORT || 3000;
const Book = require('./models/book');
const bookRouter = require('./routes/bookRouter')(Book);

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


server.use('/api/v1', bookRouter);

server.get('/', (req, res) => {
  res.send('Welcome to API tests');
});

server.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Running on Port ${port}`);
});
