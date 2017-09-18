const mongoose = require('mongoose');
const PostSchema = require('../src/post');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
    	type: String,
    	validate: {
    		validator: (name) => name.length > 2,
    		message: 'Name must be longer than two characters.'
    	},
    	required: [true, 'Name is required.']
    },
    posts: [PostSchema],
    likes: Number,
    blogPosts: [{
       	type: Schema.Types.ObjectId,
       	// blogPost refers to the blogPost model in the blogPost.js file
       	ref: 'blogPost'
    }]
});

// a virtual method are additional fields for a given model, they can set manually or automatically.
//Virtual properties don't get persisted in the database
UserSchema.virtual('postCount').get(function() {
    return this.posts.length
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
