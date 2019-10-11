const should = require('should');
const sinon = require('sinon');

const bookController = require('../controllers/booksController');

// BDD style - to describe what it is we are testing;
describe('Book Controller Tests:', () => {
  describe('Post', () => {
    it('should not allow an empty title on post', () => {
      const Book = function (book) { this.save = () => { } }

      //testing for what is sent in to our body
      const req = {
        body: {
          author: 'Jon'
        }
      }

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy(),
      }

      const controller = bookController(Book); 
      controller.post(req, res);
      res.status.calledWith(400).should.equal(true, `Bad status ${res.status.args[0][0]}`);
      res.send.calledWith('Title is required').should.equal(true)
    })
  })
})