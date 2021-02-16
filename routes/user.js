const express = require('express')
const route = express.Router()
const mongoose = require('mongoose')
const moment = require('moment')
const bcrypt = require('bcrypt')
const multer = require('multer')
const welcomeEmail = require('../middleware/emails/subscription')
const goodbyeEmail = require('../middleware/emails/unsubscription')
const User = require('../models/user')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/user-profil')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname)
    }
})
const fileFilter = (req, file, cb ) => {
      if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
        cb(null, true)
      } else {
          cb(null, false)
      }
}
const upload = multer({ 
        storage : storage, 
        limits : { fileSize : 1024 * 1024 * 5 },
        fileFilter : fileFilter
})

route.get('/', async(req, res, next) => {
    
    try {
            const users = await User.find().select('email name company phone email picture')

            if(users < 1) {
                res.status(404).json({ 
                    message : "NO USER FOUND", 
                    users
                })
            } else {
                res.status(200).json({ 
                    message : "USERS LISTS", 
                    users
                })
            }

    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message})
            }
})
route.get('/:userId', async (req, res, next) => {
    try {
            const user = await User.findById({_id : req.params.userId})
            if(user){
                    res.status(200).json({
                        message : "USER SUCCESSFULLY FETCHED",
                        user })
            }else {
                res.status(404).json({
                    message : "No Valid entry found for provided Id"})
            } 
    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message})
            }
})
route.post('/signup', async (req, res, next) => {

    let { username, password , country, age, name, gender, company, email, phone, address, about, education, skills,portfolio,socialmedialink, picture} = req.body
    const  _id = new mongoose.Types.ObjectId() 

    try {
            const existingUser = await User.find({email : email})
            if(existingUser.length >= 1){
                return res.status(409).json({
                    message : "EMAIL EXISTS"})
            }else{
                const hashedPassword = await bcrypt.hash(password, 10)
                const user = new User({
                    _id , username,
                    picture ,
                    country,age,name,gender,company,email,phone,address,about,
                    registered : moment().format("MMM Do YY"),
                    education,
                    info: { 
                        overview : "", 
                        experience : ""
                    },
                    skills,
                    portfolio,
                    socialmedialink,
                    password : hashedPassword
                })
                const newUser = await user.save()
                welcomeEmail.welcomeEmail(user.email)
                res.json({
                    message : "USER CREATED",
                    createduser : newUser,
                    request : {
                        type : 'GET',
                        url : `localhost:8080/users/${newUser._id}`
                    } 
                })
                
            }
    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message});
            }
})
route.post('/login', async(req, res, next ) => {
 
    try {
            const user = await User.find({email : req.body.email})
            let userPassword = user[0].password
            if(user.length < 1){
                res.status(404).json({
                    message : " INVALID EMAIL OR PASSWORD " })
            } else{
                const result = await bcrypt.compare(req.body.password, userPassword)     
                if(result){
                res.status(200).json({
                    message : "SUCCESSFULLY LOGGED IN",
                    user})
                } else{
                res.status(400).json({
                    message : "AUTHENTICATION FAILED !"})
                }        
            }

    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message})
            }
})
route.post('/login-social-account', async(req, res, next) => {
    try {
        const user = await User.find({email : req.body.email})
        if(user.length < 1){
            res.status(404).json({
                message : " INVALID EMAIL OR PASSWORD " })
        } else{
            res.status(200).json({
                message : "SUCCESSFULLY LOGGED IN",
                user})      
        }

}catch(error){
        res.status(500).json({
            message : "AN ERROR OCCURED",
            error : error.message})
        }
})
route.patch('/picture/:userId', upload.single('picture'), async (req, res, next) => {
    
    const userId = req.params.userId

    try {
            const user = await User.updateOne({_id : userId}, { picture: req.file.path });
            res.status(200).json({
                messgae : "USER  IMAGE SUCCESSFULLY UPDATED",
                path : req.file.path,
                request : {
                    type : 'GET',
                    url : `localhost:8080/user/${user._id}`}
            })
            
    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message })
            }

})
route.patch('/:userId', async(req, res, next ) => {

    console.log(req.body)
    const userId = req.params.userId
    const props = req.body

    try {
            const user = await User.updateOne({_id : userId}, props)
            res.status(200).json({
                messgae : "USER SUCCESSFULLY UPDATED",
                user,
                request : {
                    type : 'GET',
                    url : `localhost:8080/user/${user._id}`}
            })
    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message })
            }
})
route.delete('/:userId', async(req, res, next) => {

    const userId = req.params.userId

    try {
            const result = await User.deleteOne({_id : userId})
            // goodbyeEmail.goodbyeEmail(user.email)
            res.status(200).json({
                message : "USER SUCCESSFULLY DELETED",
                result,
                request : {
                    type : 'CREATE USER',
                    url : `localhost:8080/user/`}
            })
    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message })
            }
})



module.exports = route