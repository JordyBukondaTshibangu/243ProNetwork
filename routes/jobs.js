const express = require('express')
const mongoose = require('mongoose')
const moment = require('moment')
const route = express.Router();
const Job = require('../models/jobs')
const auth = require('../middleware/auth')



route.get('/', async(req, res, next) => {    
    try {
       const jobs = await Job.find()
        if(jobs.length > 0){
            res.status(200).json({
                message : "ALL JOBS FETCHED SUCCESSFULLY",
                count : jobs.length,
                jobs 
        })
        }else {
            res.status(404).json({
                message : "NO JOBS FOUND "})
        }
    }catch(error){
            res.status(500).json({
                message : "Something went wrong",
                error : error.message})
        }
})
route.get('/my-jobs', async(req, res, next) => {    
    const email = req.query.email
    try {
       const jobs = await Job.find({ email })
        if(jobs.length > 0){
            res.status(200).json({
                message : "ALL JOBS FETCHED SUCCESSFULLY",
                count : jobs.length,
                jobs 
        })
        }else {
            res.status(404).json({
                message : "NO JOBS FOUND "})
        }
    }catch(error){
            res.status(500).json({
                message : "Something went wrong",
                error : error.message})
        }
})
route.get('/:jobId', async(req, res, next) => {

    const jobId = req.params.jobId
    try{

        const job = await Job.findById(jobId)
        if(job){
                res.status(200).json({
                    message : "job SUCCESSFULLY FETCHED",
                    job })
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
route.post('/', async(req, res, next) => {

    const { title, applicants,country, author,content,jobType, salary, views, email, phone, address, overview, total_employee, socialmedialink } = req.body
    const _id =  new mongoose.Types.ObjectId()
    let date = moment().format("MMM Do YY")
    const job = new Job({_id, title, applicants , jobType, salary,views,country,author, email,phone,content, overview ,total_employee,socialmedialink,date, address})
    
    try {
        const newJob = await job.save()
        res.json({
            message : "JOB CREATED",
            createdjob : newJob,
            request : {
                type : 'GET',
                url : `localhost:8080/jobs/${newJob._id}`} 
        })
    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message });
    }
})
route.patch('/:jobId', async(req, res, next) => {

    const jobId = req.params.jobId
    const props = req.body
    try {
        const job = await Job.update({_id : jobId}, props)
        res.status(200).json({
            messgae : "JOB SUCCESSFULLY UPDATED",
            job,
            request : {
                type : 'GET',
                url : `localhost:8080/jobs/${job._id}`}
        })
    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message})
            }
})
route.delete('/:jobId', async(req, res, next) => {

    const jobId = req.params.jobId

    try {
        const job = await Job.findByIdAndDelete({_id : jobId})
        if(job){
            res.status(200).json({
                message : "JOB SUCCESSFULLY DELETED",
                job,
                request : {
                    type : 'CREATE JOB',
                    url : `localhost:8080/jobs/${job._id}`}
            })
        }else {
            res.status(404).json({
                message : "NO JOB FOUND" })
        }
    }catch(error){
            res.status(500).json({
                message : "AN ERROR OCCURED",
                error : error.message})
            }
})

module.exports =  route