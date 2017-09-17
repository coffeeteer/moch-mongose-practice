const assert = require('assert');
const User = require('../src/user');
describe('Updating users', () => {
    let jen;

    beforeEach((done) => {
        jen = new User({name: 'Jen', likes: 0});
        jen.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => User.find({}))
            .then((users) => {
                assert(users.length === 1);
                assert(users[0].name === 'Jennifer');
                done();
            })
    }


    it('Updating users with Set n Save', (done) => {
        jen.set('name', 'Jennifer');
        assertName(jen.save(), done);
    });

    it('Updating a model instance', (done) => {
        assertName(jen.update({name: 'Jennifer'}), done);
    });

    it('Updating a model class', (done) => {
        assertName(
            User.update({name: 'Jen'}, {name: 'Jennifer'}),
            done
        );
    });

    it('Updating a model class with a single record', (done) => {
        assertName(
            User.findOneAndUpdate({name: 'Jen'}, {name: 'Jennifer'}),
            done
        );
    });

    it('Updating a user with by its Id', (done) => {
        assertName(
            User.findByIdAndUpdate(jen._id, {name: 'Jennifer'}),
            done
        );
    });

    //Updating Operators
    it('Updating a user\'s post counts by 10', (done) => {
        User.update({name: 'Jen'}, {$inc: {likes: 10}})
            .then(() => User.findOne({name: 'Jen'}))
            .then((user) => {
                assert(user.likes === 10);
                done();
            })
    });
});
