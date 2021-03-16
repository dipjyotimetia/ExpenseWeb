const expect = require('chai').expect;
const sinon = require('sinon');
const expensesController = require('../controllers/expensesController');

describe('Expense Controller Test:', () => {
    describe('Post', () => {
        it('Should not allow and empty', () => {
            const Expense = function (expense) { this.save = () => { } };
            const req = {
                body: {
                    username: 'Jon'
                }
            };

            const res = {
                status: sinon.spy(),
                send: sinon.spy(),
                json: sinon.spy()
            }

            const controller = expensesController(Expense);
            controller.post(req, res);

            expect(res.status.calledWith(400)).to.be.equal(true, `Bad Status ${res.status.args[0][0]}`);
            expect(res.send.calledWith('Title is required')).to.be.equal(true);
        })
    })

})
