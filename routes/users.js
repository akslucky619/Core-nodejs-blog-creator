var express = require('express');
var router = express.Router();
var User = require('../models/user')

// / rendering user form
router.get('/new', function(req, res, next) {
  // console.log(req.session);
  // res.send('respond with a resource');
  res.render('userForm')
});

// posting user data from form to database

router.post('/new', function(req, res, next){
  User.create(req.body, (err, result)=>{
    if(err) return next(err);
    res.redirect('/users/login')
  })
})

// getting usser listing from database and display

router.get('/', function(req, res, next){
  User.find({}, (err, userlist)=>{
    if(err) return next(err);
    res.render('userDisplay', {allusers: userlist})
  })
})

// getting user login form

router.get('/login', function(req, res){
  res.render('userLogin')
})

router.post('/login', (req,res, next)=>{
  // console.log(req.body);
  var {email, password} = req.body;
  // console.log(req.body)
  if(!email||!password){
    res.redirect('/users/login');
  }
  User.findOne({email:email}, (err,user)=>{
    // console.log(err, user);
    if(err) return res.status(500).next(err);
    if(!user) return res.status(400).redirect('/users/login');
    // console.log(user);
    if(!user.validatePassword (password)) return res.status(400).redirect('/users/login')
    req.session.userId = user._id;
    res.redirect('/')
  })
})

router.get('/logout', (req,res,next)=>{
  if(req.session){
    req.session.destroy();
    res.redirect('/')
  }
})

module.exports = router;
