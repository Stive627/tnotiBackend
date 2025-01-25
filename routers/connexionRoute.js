const express = require('express')
const { register, login, passwordRecovery, passwordChange } = require('../controllers/connexionController')
const routerConnexion = express.Router()
routerConnexion.post('/register', register)
routerConnexion.post('/login', login)
routerConnexion.post('/forgetPassword', passwordRecovery)
routerConnexion.post('/changePassword', passwordChange)
module.exports = routerConnexion