const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const server = express();
const db = mongoose.connect('mongodb://localhost/bookAPI');
const bookRouter = express.Router();
const port = process.env.PORT || 3000;
const Book = require('./models/book');

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

bookRouter.route('/books')
  .post((req, res) => {
    const book = new Book(req.body);
    book.save();
    return res.status(201).json(book);

  })

  //to get all books in db
  .get((req, res) => {
    // const {query} = req;
    const query = {};

    //to get and filter by genre
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      return res.json(books);
    })
  });

bookRouter.route('/books/:bookId')
  .get((req, res) => {
    Book.findById(req.params.bookId, (err, book) => {
      if (err) {
        return res.send(err);
      }
      return res.json(book);
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
