const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let jen;

    beforeEach((done) => {
        jen = new User({name: 'Jen'})
        jen.save()
            .then(() => done());
    });

    it('Model instance remove', (done) => {
        jen.remove()
            .then(() => User.findOne({name: 'Jen'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('Removing with model Class', (done) => {
        jen.remove({name: 'Jen'})
            .then(() => User.findOne({name: 'Jen'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('Remove with findOneAndRemove', (done) => {
        User.findOneAndRemove({name: 'Jen'})
            .then(() => User.findOne({name: 'Jen'})).
            then((user) => {
                assert(user === null);
                done();
            });
    });

    it('Remove with findByIdAndRemove', (done) => {
        User.findByIdAndRemove(jen._id)
            .then(() => User.findOne({name: 'Jen'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });
});
