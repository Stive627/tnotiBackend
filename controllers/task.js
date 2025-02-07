const taskModel = require("../Models/task")
const profileModel = require('../Models/profile')

const addTask = async(req, res) => {
    const {title, date, start, end} = req.body
    if(!title || !date || !start || !end){
        return res.status(400).send('Some fields are missing.')
    }
    const newTask = new taskModel({owner:req.user._id, ...req.body})
    await newTask.save().then(()=>res.status(200).send('New task added')).catch((err) => res.status(400).send( `An error occured\n${err}`))
    // const profileUser = await profileModel.findById({_id:req.user._id})
    // await profileUser.updateOne({tasks:[...profileUser.tasks, newTask]})
}
const updateTask = async(req, res) => {
    const {title, date, start, end} = req.body
    if(!title || !date || !start || !end){
        return res.status(400).send('Some fields are missing.')
    }
    await taskModel.updateOne({_id:req.params.id}, {...req.body})
}
const deleteTask = async(req, res) => {
    await taskModel.deleteOne({_id:req.params.id})
    .then(() => res.status(200).send('Task deleted'))
    .catch((err) => res.status(400).send(`An error occured while deleting the\n${err}`))
}
module.exports = {addTask, updateTask, deleteTask}