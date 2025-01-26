const express = require('express')
const axios = require('axios')
const { userModel } = require('./Models/user')
const routergooglelogin = express.Router()

const CLIENT_ID = '35309290975-64td0il04o6nq220bs1rl00v0jl0pj82.apps.googleusercontent.com'
const CLIENT_SECRET = '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'
const REDIRECT_URI = 'http://localhost:3000/auth/google/callback'

routergooglelogin.get('/auth/google', (req, res)=>{
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    res.redirect(url)
})

routergooglelogin.get('/auth/google/callback', async(req, res)=>{
    const {code} = req.query
    try{ 
    const {data} = await axios.post('https://oauth2.googleapis.com/token', {
        client_id:CLIENT_ID,
        client_secret:CLIENT_SECRET,
        code,
        redirect_uri:REDIRECT_URI,
        grant_type:'authorization_code'
    })
    const {access_token, id_token} = data
    const {data:profile} = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo',{
        headers:{Authorization: `Bearer ${access_token}`}
    })
    console.log(profile)
    const user = await userModel.findOne({email:profile.email})
    if(user){
        res.status(200).send('Successfully logged')
    }
    res.status(400).send('user not found')
    
    
} catch(error){
console.error('Error:', error.response.data.error)
res.redirect('/login')
}
})

routergooglelogin.get('/logout', (req, res)=>{
    res.redirect('/login')
})

module.exports = routergooglelogin