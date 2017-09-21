const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Assoication', () => {
    let jen, blogPost, comment;

    beforeEach((done) => {
        jen = new User({name: 'Jen'});
        blogPost = new BlogPost({title: 'JS is love.', content: 'JS is life.'});
        comment = new Comment({content: 'You\'re right JS is Shriek.'});

        jen.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = jen;

        Promise.all([jen.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('Saves the relation between the a user and a blogPost', (done) => {
        User.findOne({name: 'Jen'})
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is love.');
                done();
            });
    });

    it('saves a full relation graph', (done) => {
        User.findOne({name: 'Jen'})
            .populate({
                path: 'blogPosts',
                populate: {
                    path: 'comments',
                    model: 'comment',
                    populate: {
                        path: 'user',
                        model: 'user'
                    }
                }
            })
            .then((user) => {
                assert(user.name === 'Jen');
                assert(user.blogPosts[0].title === 'JS is love.');
                assert(user.blogPosts[0].comments[0].content === 'You\'re right JS is Shriek.');
                assert(user.blogPosts[0].comments[0].user.name === 'Jen');

                done();
            });
    });
});
