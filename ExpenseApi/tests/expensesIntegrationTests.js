const expect = require('chai').expect;
const request  = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Expense = mongoose.model('Expense');
const agent = request(app);

describe('Expense Crud Test', () => {
  it('Should allow an expense to be posted and return read and _it',(done) =>{
        const expensePost = {username:'test user',expenseType:'test',expenseAmount:20,expenseDate:'12/12/12'};
        agent.post('/api/expenses')
        .send(expensePost)
        .expect(200)
        .end((err,res) =>{
            expect(res.body).to.have.property('username');
            done();
        })
  })

  afterEach((done) =>{
    Expense.deleteMany({}).exec();
    done();
  });

  after((done) => {
      mongoose.connection.close();
      app.server.close(done());
  })
})
