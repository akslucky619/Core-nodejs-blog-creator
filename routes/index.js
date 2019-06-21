var express = require('express');
var router = express.Router();
var Blog = require('../models/blog')

/* GET home page. */
router.get('/', (req, res, next)=>{
  // if(req.session && req.session.userId){
  Blog.find({}, (err, fullbloglist)=>{
    if(err) return next(err);
    res.render('blogDisplay', {blogitems: fullbloglist});
  })
// }
// else{
//   res.redirect('/users/login')
// }
})

module.exports = router;
