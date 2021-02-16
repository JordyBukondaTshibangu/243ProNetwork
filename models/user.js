const mongoose = require('mongoose')
const userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId ,
    username: {type : String},
    password: {type : String},
    picture: {type : String},
    country: {type : String},
    age: { type : String},
    name: {type : String},
    gender: {type : String},
    company: {type : String},
    email: {
        type : String, 
        required : true, 
        unique : true,
        match : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ 
    },
    phone: {type : String},
    address: {type : String},
    about: {type : String},
    registered: {type : String},
    info: {
        overview : {type : String},
        experience :{type : String},
    },
    education:{type : String},
    skills: [String],
    portfolio: [String],
    socialmedialink: [String],
  })


module.exports = mongoose.model('User', userSchema)
