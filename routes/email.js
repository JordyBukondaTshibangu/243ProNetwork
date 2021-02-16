const express = require('express')
const router = express.Router()
const sendEmail = require('../middleware/emails/sendEmail')
const applyJob = require('../middleware/emails/apply-job')


router.post('/send-email', async (req, res, next) => {

    const { senderemail, recipientEmail, title, content } = req.body
    try {
        await sendEmail.sendEmail(senderemail, recipientEmail, title, content)
        res.status(200).json({
        message : "Email successfully sent"
    })
    }catch(error){
        res.status(500).json({
            message : "AN ERROR OCCURED",
            error : error.message });
    }
})
router.post('/apply-job', async (req, res, next) => {

    const { senderemail, recipientEmail, title, content } = req.body
    try {
        await applyJob.applyJob(senderemail, recipientEmail, title, content)
        res.status(200).json({
        message : "Email successfully sent"
    })
    }catch(error){
        res.status(500).json({
            message : "AN ERROR OCCURED",
            error : error.message });
    }
})

module.exports = router