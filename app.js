const express = require('express');

const server = express();

const port = process.env.PORT || 3000;

const bookRouter = express.Router();

bookRouter.route('/books')
  .get((req, res) => {
    const response = { Hello: 'This is my API approach' };
    res.json(response);
  });

server.use('/api/v1', bookRouter);

server.get('/', (req, res) => {
  res.send('Welcome to API tests');
});

/* eslint-disable-next-line no-console */
server.listen(port, () => {
  console.log(`Running on Port ${port}`);
});
