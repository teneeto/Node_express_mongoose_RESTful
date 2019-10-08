const express = require('express');
const mongoose = require('mongoose');

const server = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/book');

bookRouter.route('/books')
  .get((req, res) => {
    Book.find((err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    })
  });

server.use('/api/v1', bookRouter);

server.get('/', (req, res) => {
  res.send('Welcome to API tests');
});

server.listen(port, () => {
  /* eslint-disable-next-line no-console */
  console.log(`Running on Port ${port}`);
});
