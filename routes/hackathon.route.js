var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var HackathonController = require('../controllers/hackathon.controller');


// Map each API to the Controller FUnctions

router.get('/', HackathonController.getHackathons)

router.post('/', HackathonController.createHackathon)

// router.put('/', ToDoController.updateTodo)

// router.delete('/:id',ToDoController.removeTodo)


// Export the Router

module.exports = router;