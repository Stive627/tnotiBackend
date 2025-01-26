var fs = require('fs')
const profileModel = require('../Models/profile')
async function addImage(req, res){
    if(!req.file){
        return res.status(400).send('No image selected')
    }
    if(req.file.size > 4194304){ return res.status(400).send('Maximum size is 4Mo')}
    if(req.file.profile){
        fs.unlink(req.body.profile, function(err){
            if(err){
                return   res.status(400).send(`An error occured\n${err}`)
                }
    })}
    await profileModel.updateOne({_id:req.user._id}, {image:req.file.path})
    .then(() => res.status(200).send('Profile picture added')).catch((err) => res.status(400).send(`An error occured while adding profile picture\n${err}`))
}
async function createProfile(req, res) {
    const {username, dob, plan} = req.body
    if(!username || !dob || !plan){
        res.status(400).send('There are missing fields.')
    }
    const newProfile = new profileModel({user:req.user._id, username:username, dob:dob, plan:plan})
    await newProfile.save().then(() => res.status(200).send('New profile created!')).catch((err) => res.status(400).send(`An error occurued while creating the profile, ${err}`))
}
async function updateProfile(req, res) {
    const {username, dob, plan} = req.body
    if(!username || !dob || !plan){
        res.status(400).send('There are missing fields.')
    }
    await profileModel.updateOne({_id:req.params.id}, {...req.body})
}
module.exports = {addImage, createProfile, updateProfile}