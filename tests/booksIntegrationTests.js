require('should');

const request = require('supertest');
const mongoose = require('mongoose');

process.env.ENV = 'Test';

const server = require('../app');

const Book = mongoose.model('Book');
const agent = request.agent(server);

describe('Book CRUD Test', () => {
  it('should allow a book to be posted and return read and _id', (done) => {
    const bookPost = {
      title: 'My book of Bible Stories',
      author: 'JWitness',
      genre: 'bible'
    }
    agent.post('/api/v1/books')
      .send(bookPost)
      .expect(200)
      .end((err, results) => {
        // console.log(results);

        // results.body.read.should.not.equal(false);
        results.body.should.have.property('_id');
        done();
      })
  })
  afterEach((done) => {
    Book.deleteMany({}).exec();
    done();
  })
  after((done) => {
    mongoose.connection.close();
    server.server.close(done());
  })
})
