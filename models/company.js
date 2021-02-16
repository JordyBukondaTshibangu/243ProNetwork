const mongoose = require('mongoose')
const companySchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId ,
    company: {type : String},
    password: {type : String, required : true},
    picture: {type : String},
    country: {type : String},
    createdAt : {type : String},
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
    total_number_employee : Number,
    info: {
        overview : {type : String},
        awards : [ String ],
    },
    skills: [String],
    portfolio: [String],
    socialmedialink: [String],    
  })


module.exports = mongoose.model('Company', companySchema)
  
