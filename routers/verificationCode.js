const express = require('express')
const verificationCodeController = require('../controllers/verificationCodeController')
const routerVerificationCode = express.Router()
routerVerificationCode.post('/verification',verificationCodeController)
module.exports = routerVerificationCode