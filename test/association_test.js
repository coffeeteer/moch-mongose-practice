const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Association', () => {
    let jen, blogPost, comment;

    beforeEach((done) => {
        jen = new User({name: 'Jen'});
        blogPost = new BlogPost({title: 'JS is life.', content: 'JS is love.'});
        comment = new Comment({content: 'Python is also great.'});

        jen.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user =  jen;

        Promise.all([jen.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });

    it('Saves the relation to the user and blogPost', (done) => {
        User.findOne({name: 'Jen'})
            .populate('blogPosts')
            .then((user) => {
                assert(user.blogPosts[0].title === 'JS is life.');
                done();
            });
    });
});
