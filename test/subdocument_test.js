const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
    it('Creates a document', (done) => {
        let jen = new User({
            name: 'Jen',
            posts: [{title: 'PostTitle'}]
        });

        jen.save()
            .then(() => User.findOne({name: 'Jen'}))
            .then((user) => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            });
    });

    it('Create a subdocument', (done) => {
        let jen = new User({
            name: 'Jen',
            posts: []
        });

        jen.save()
            .then(() => User.findOne({name: 'Jen'}))
            .then((user) => {
                user.posts.push({posts: 'New Post'});
                return user.save
            })
            .then(() => User.findOne({name: 'Jen'}))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });
})
