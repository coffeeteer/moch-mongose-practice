const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('Association', () => {
    const jen, blogPost, comment;

    beforeEach((done) => {
        jen = new User({name: 'Jen'});
        blogPost = new BlogPost({title: 'JS is very useful', content: 'It can be a challenge to learn.'});
        comment = new Comment({content: 'I am trying hard to the the ins and outs of JS.'});

        jen.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = jen;

        Promise.all([jen.save(), blogPost.save(), comment.save()])
            .then(() => done());
    });
});
