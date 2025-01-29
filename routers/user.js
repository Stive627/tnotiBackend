const express = require('express')
const { register, login, passwordRecovery, passwordChange} = require('../controllers/user')
const routeruser = express.Router()
routeruser.post('/register', register)
routeruser.post('/login', login)
routeruser.post('/forgetPassword', passwordRecovery)
routeruser.post('/changePassword', passwordChange)
module.exports = routeruser