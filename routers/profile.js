const express = require('express')
const profilerouter = express.Router()
const jwt = require('jsonwebtoken')
const multer = require('multer')
const { addImage, createProfile, updateProfile } = require('../controllers/profile')
require('dotenv').config()

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, 'public/profile/')
    },
    filename: function(req, file, cb){
        cb(null, file.originalname)
    } 
})

const authRoute = (req, res, next) => {
    const token = req.headers['authorization']
    if(!token) return res.status(401).send("you have to provide a token.")
    const payload = process.env.SECRET_KEY
    jwt.verify(token,payload, (err, user) => {
    if(err){
        res.status(403).send(err)
        return;
    }
    req.user = user
    next()
    })
}

const upload = multer({storage:storage})

profilerouter.post('/addImage',authRoute, upload.single('profile'), addImage)
profilerouter.post('/create', authRoute, createProfile)
profilerouter.post('/updateProfile', authRoute, updateProfile)
module.exports = profilerouter