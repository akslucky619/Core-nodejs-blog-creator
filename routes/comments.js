var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/user');
var Blog = require('../models/blog');
var authcontroller = require('../controllers/authcontroller')
var Comment = require('../models/comment');


router.post('/:id/comments', (req,res)=>{
    console.log(req.params);
    Comment.create(req.body, (err, result)=>{
        if(err) return next(err)
        res.redirect(`/blogs/${req.params.id}`)
    })
} )


module.exports = router;