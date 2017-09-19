const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
    it('postCount returns a number of posts', (done) => {
        const jen = new User({
            name: 'Jen',
            posts: [{title: 'PostTitle'}]
        });

        jen.save()
            .then(() => User.findOne({name: 'Jen'}))
            .then(() => {
                assert(jen.postCount === 1);
                done();
            });
    });
});
