const assert = require('assert');
const User = require('../src/user');

describe('Reading the record instances', () => {
    let jen;

    beforeEach((done) => {
        jen = new User({name: 'Jen'});
        jen.save()
            .then(() => done());
    });

    it('Reading a record instance', (done) => {
        User.find({name: 'Jen'})
            .then((users) => {
                assert(users[0]._id.toString() === jen._id.toString());
                done();
            })
    });

    it('Find a user with a particular Id', (done) => {
        User.findOne({_id: jen._id})
            .then((user) => {
                assert(user.name === 'Jen');
                done();
            });
    });
});
