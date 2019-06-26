var User = require('../models/user')

exports.isUserLogged = (req,res, next) =>{
    if(req.session && req.session.userId){
        User.findById(req.session.userId, (err, user) => {
            if(err) res.redirect('/users/login');
            res.locals.user = user;
            req.user = user;
            console.log(user)
             next()
        })
    }
    else{
        res.redirect('/users/login')
    }
}

exports.userSession = (req, res, next) => {
    console.log(req.session, 'cp1')
    if(req.session && req.session.userId){
        User.findById(req.session.userId, (err, user)=>{
            console.log(err, user, 'cp2')
            if(err) return next(err)
            req.user = user;
            res.locals.user = user;
            next()
        })
    }
    else{
        console.log('cp3');
        req.user= null;

        res.locals.user = null;
        
        next()
    }
}

// exports.check = (req,res,next)=>{
//     User.findById(req.session.userId, (err, user)=>{
//         if(err) return next(err)
//         req.user = user;
//         res.locals.user = user;
//     })
// }
// exports.checkingInput = (req,res, next)=>{
//     if(req.body == ''){
//         res.redirect('/blogs/new');
//     }
// }