const mongoose = require('mongoose');
require('dotenv').config()
const Post = require('../models/post')
const Job = require('../models/jobs')
const User = require('../models/user')
const Company = require('../models/company')
const Comment = require('../models/comments')

mongoose.connect(process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology : true } );

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
    console.log("connection to db open")
});