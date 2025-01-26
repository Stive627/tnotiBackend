const mongoose = require('mongoose')
const { Schema} = mongoose
const profileSchema = new Schema({
    username:{type:String, required:true},
    dob:{type:String, required:true},
    plan:{type:String, required:true},
    picture:{type:String, required:false},
    user:{type:Schema.Types.ObjectId, ref:'user', required:true}
}, {timestamps:true})
const profileModel = mongoose.model('profile', profileSchema)
module.exports = profileModel