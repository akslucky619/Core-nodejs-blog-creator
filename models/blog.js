var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user')

var blogSchema = new Schema({
    title:{
        type: String
    },
    description: String,
    content: String,
    tags: [String],
    author: {type: Schema.Types.ObjectId, ref:'User'}
},{timestamps: true});

var Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog;