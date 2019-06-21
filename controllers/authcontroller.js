var User = require('../models/user')

exports.isUserLogged = (req,res, next) =>{
    if(req.session && req.session.userId){
        User.findById(req.session.userId, (err, user) => {
            if(err) res.redirect('/users/login');
            res.locals.user = user;
            req.user = user;
             next()

        })
    }
    else{
        res.redirect('/users/login')
    }
}