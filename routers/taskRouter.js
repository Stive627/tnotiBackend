const express = require('express')
const taskRouter = express.Router()
taskRouter.post('/addTask',)
taskRouter.post('/edit/:id')
taskRouter.delete('/delete/:id')
module.exports = taskRouter