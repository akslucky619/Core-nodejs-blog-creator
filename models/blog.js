var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user')

var blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    tags: [String],
    author: {type: Schema.Types.ObjectId, ref:'User'},
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},{timestamps: true});

var Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog;