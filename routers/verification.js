const express = require('express')
const verificationCodeController = require('../controllers/verification')
const verificationrouter = express.Router()
verificationrouter.post('/verification',verificationCodeController)
module.exports = verificationrouter