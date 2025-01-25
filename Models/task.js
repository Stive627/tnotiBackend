const mongoose = require('mongoose')

const {Schema} = mongoose

const taskSchema = new Schema({
    title:{type:String, required:true},
    date:{type:Date, required:true},
    start:{type:String, required:true},
    end:{type:String, required:true},
    completed:{type:String, required:true, default:false},
    owner:{type: Schema.Types.ObjectId, required:true, ref:'user'}
},{timestamps:true})

const taskModel = mongoose.model('tasks', taskSchema)

module.exports = taskModel