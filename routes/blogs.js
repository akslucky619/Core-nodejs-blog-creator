var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');
var commentRouter = require('./comments');
var authcontroller = require('../controllers/authcontroller')
var Comment = require('../models/comment')

router.get('/new', authcontroller.isUserLogged, (req, res, next)=>{
    res.render('blogform'  )
})

router.post('/new', authcontroller.isUserLogged, (req, res, next)=>{
    var tags = req.body.tags.split(',');
    req.body.tags = tags;
    Blog.create(req.body,(err,result)=>{
        if(err) return next(err);
        res.redirect('/')
    })
})

router.get('/:id', authcontroller.isUserLogged, (req, res, next)=>{
    var id = req.params.id;
    Blog.findById(id)
    .populate({
        path: 'comments',
        populate: {
            path: 'author'
        }
    })
    .exec((err, blog) => {
        console.log(blog);
        if(err) return next(err);
        res.render('bloglisting', {blog: blog})
    })
})

// router.get('/:id', (req,res, next)=>{
//     Comment.find({}, (err, comment)=>{
//         if(err) return next(err);
//         res.re
//     })
// })

router.get('/:id/edit', (req, res, next)=>{
    var id = req.params.id;
    Blog.findById(id, (err, blog)=>{
        res.render('blogedit', {blog: blog})
    })
})

router.post('/:id/update', (req, res, next)=>{
    var id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body, {new:true}, (err,blog)=>{
        if(err) return next(err);
        res.redirect('/')
    })
})

router.get('/:id/delete', (req,res, next)=>{
    var id = req.params.id;
    Blog.findByIdAndDelete(id, (err, blog)=>{
        if(err) return next(err);
        res.redirect('/')
    })
})

router.get('/bloguser', authcontroller.isUserLogged, (req, res, next)=>{
    if(req.session && req.session.user._id){
        Blog.find({}, (err, userbloglist)=>{
            if(err) return next(err);
            res.render('userblog', {blogitems: userbloglist})
        })
    }
    else{
        res.redirect('/')
    }
})

router.use('/', commentRouter)

module.exports = router;