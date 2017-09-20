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

    it('Creates a subdocument', (done) => {
        let jen = new User({
            name: 'Jen',
            posts: []
        });

        jen.save()
            .then(() => User.findOne({name: 'Jen'}))
            .then((user) => {
                user.posts.push({title: 'New Post'});
                return user.save();
            })
            .then(() => User.findOne({name: 'Jen'}))
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });

    it('can remove existing subdocument', (done) => {
		const joe = new User({
			name: 'Joe',
			posts: [{title: 'New Title'}]
		});

		joe.save()
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				const post = user.posts[0];
				post.remove();
				return user.save();
			})
			.then(() => User.findOne({name: 'Joe'}))
			.then((user) => {
				assert(user.posts.length === 0);
				done();
			});
	});
});
