var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt')
var Blog = require('../models/blog');

var userSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
},{timestamps: true})

userSchema.pre('save', function(next){
    var salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt)
    console.log(this)
    next();
})

userSchema.methods.validatePassword = function(password) {
    console.log(this);
    return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model('Users', userSchema);
module.exports = User;