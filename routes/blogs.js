var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');
var commentRouter = require('./comments');
var authcontroller = require('../controllers/authcontroller')
var Comment = require('../models/comment');
var User = require('../models/user')

router.get('/new', authcontroller.isUserLogged, (req, res, next) => {
    res.render('blogform')
})

router.post('/new', authcontroller.isUserLogged, (req, res, next) => {
    var tags = req.body.tags.split(',');
    req.body.tags = tags;
    Blog.create(req.body, (err, result) => {
        if (err) return next(err);
        res.redirect('/')
    })
})

router.get('/:id', (req, res, next) => {
    var id = req.params.id;
    Blog.findById(id)
        .populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        }).populate('author')
        .exec((err, blog) => {
            // console.log(blog.author, 'check1');
            if (err) return next(err);
            res.render('bloglisting', { blog: blog })
        })
})

// router.get('/:id', (req,res, next)=>{
//     Comment.find({}, (err, comment)=>{
//         if(err) return next(err);
//         res.re
//     })
// })

router.get('/:id/edit', authcontroller.isUserLogged, (req, res, next) => {
    var id = req.params.id;
    Blog.findById(id, (err, blog) => {
        // console.log(blog, 'inside blog')
        res.render('blogedit', { blog: blog })
    })
})

router.post('/:id/update', authcontroller.isUserLogged, (req, res, next) => {
    var id = req.params.id;
    Blog.findByIdAndUpdate(id, req.body, { new: true }, (err, blog) => {
        if (err) return next(err);
        res.redirect('/')
    })
})

router.get('/:id/delete', authcontroller.isUserLogged, (req, res, next) => {
    var id = req.params.id;
    Blog.findById(id, (err, blog) => {
        if(blog.author == req.user._id){
            Blog.findByIdAndDelete(id, (err,blog)=>{
                if(err) return next(err);
                res.redirect('/')
            })
        }
        if (err) return next(err);
        res.send('not allowed')
    })
})


router.get('/bloguser', authcontroller.isUserLogged, (req, res, next) => {
    if (req.session && req.session.user._id) {
        Blog.find({}, (err, userbloglist) => {
            if (err) return next(err);
            res.render('userblog', { blogitems: userbloglist })
        })
    }
    else {
        res.redirect('/')
    }
})


// add to favorites
router.get('/:id/favorites', authcontroller.isUserLogged, (req,res,next)=>{
    Blog.findById(req.params.id, (err, blog)=>{
        // console.log(err, blog ,"check1");
        if(err) return next(err);
        User.findByIdAndUpdate(req.user._id,{
            $push:{favorites: blog._id}}, (err, result) => {
                console.log(err , result, "check2")
            if(err) return next(err)
            res.redirect(`/blogs/${blog.id}`)
        })
    })
})

router.get('/:id/unfavorite', authcontroller.isUserLogged, (req,res,next)=>{
    Blog.findById(req.params.id, (err, blog)=>{
        console.log(err, blog ,"check1");
        // if(err) return next(err);
        User.findByIdAndUpdate(req.user._id,{
            $pull:{favorites: blog._id}}, (err, result) => {
                console.log(err , result, "check3")
            if(err) return next(err)
            res.redirect(`/blogs/${blog.id}`)
        })
    })
})

router.use('/', commentRouter)

module.exports = router;