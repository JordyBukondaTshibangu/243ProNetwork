const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    
    _id: mongoose.Schema.Types.ObjectId,
    title: {type : String, required : true},
    country: {type : String, required : true},
    author: {type : String,  required : true},
    content: {type : String, required : true},
    email : { type : String, required : true},
    date: String,
    likes: {type : Number, default : 0},
    postImage: {type : String},
    comments: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comment"
    }]
})

module.exports = mongoose.model('Post', postSchema)  