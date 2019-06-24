var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user')
var Blog = require('../models/blog');

var CommentSchema = new Schema({
    description: String,
    blogpost: {type: Schema.Types.ObjectId, ref:'Blog'},
    author: {type: Schema.Types.ObjectId, ref:'User'}
},{timestamps: {createdAt: 'created_at'}});

var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;