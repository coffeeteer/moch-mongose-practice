const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
    // Schema.Types.ObjectId assigns the path to ref
    //the ref key refers to the model, in this case the User model
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
