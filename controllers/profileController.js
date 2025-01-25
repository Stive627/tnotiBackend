const { userModel } = require("../Models/user")
var fs = require('fs')
async function addImage(req, res){
    if(!req.file){
        return res.status(400).send('No image selected')
    }
    if(req.file.size > 4194304){ return res.status(400).send('Maximum size is 4Mo')}
    if(req.file.profile){
        fs.unlink(req.body.profile, function(err){
            if(err){
                    res.status(400).send(`An error occured\n${err}`)
                }
            else{
                res.status(200).send('File deleted')
            }
            })
    }
    await userModel.updateOne({_id:req.user._id}, {image:req.file.path})
    .then(() => res.status(200).send('Profile picture added')).catch((err) => res.status(400).send(`An error occured while adding profile picture\n${err}`))
}
module.exports = {addImage}