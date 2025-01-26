const express = require('express')
const { addTask, updateTask, deleteTask } = require('../controllers/task')
const taskRouter = express.Router()
taskRouter.post('/addTask', addTask)
taskRouter.post('/edit/:id', updateTask)
taskRouter.delete('/delete/:id', deleteTask)
module.exports = taskRouter