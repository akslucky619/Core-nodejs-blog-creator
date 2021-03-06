var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../models/user');
var Blog = require('../models/blog');
var authcontroller = require('../controllers/authcontroller')
var Comment = require('../models/comment');

// router.post('/:id/comments', authcontroller.isUserLogged, (req,res)=>{
//     var newComment = req.body;
//     var id = req.params.id
//         Blog.findByIdAndUpdate(id, {
//             $push:{
//                 comment: newComment.id
//             }
//         })
// })

router.post('/:id/comments', (req,res)=>{
    // console.log(req.params);
    Comment.create(req.body, (err, result)=>{
        if(err) return next(err)
        Blog.findByIdAndUpdate(req.params.id,{
            $push:{comments: result._id}}, (err, blog) => {
                // console.log(err, blog);
                res.redirect(`/blogs/${blog.id}`)
            }
        )
    })
})

// router.post('/:id/comments', (req,res,next)=>{
//     Comment.create(req.body)
//     .populate
// })

router.get('/:id/edit', (req,res)=>{
    Comment.findById(req.params.id, (err, result)=>{
        if(err) return next(err);
        // console.log(result, "tis is res")
        res.render('commentedit',{comment: result});
    })
})

// router.get('/:id/edit', (req,res,next)=>{
//     console.log(req.params.id)
//     Comment.findById(req.params.id)
//     .populate('author')
//     .exec((err,result)=>{
//         console.log(result)
//         if(err) return next(err);
//         res.render('commentedit',{comment:result})
//     })
// })

router.post('/:id/update', (req, res, next)=>{
    var id = req.params.id;
    Comment.findByIdAndUpdate(id, req.body, {new:true}, (err,comment)=>{
        if(err) return next(err);
        res.redirect(`/blogs/${comment.blogpost}`)
    })
})

router.get('/:id/delete', (req,res)=>{
    var id = req.params.id;
    Comment.findByIdAndDelete(id, (err, comment)=>{
        // console.log(comment);
        if(err) return next(err);
        res.redirect('/');
    })
})

module.exports = router;