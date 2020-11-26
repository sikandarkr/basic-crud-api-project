const express = require("express");
const router = express.Router();
const todoController = require("../controllers/controllers");

// Create a new Todo
router.post("/add", todoController.add)

// Retrieve all ToDos
router.get("/todos", todoController.read)

router.get('/todo/:todoId', todoController.singleToDo);

// Update a Note with noteId
router.put('/todos/:todoId', todoController.update);

// Delete a Note with noteId
router.delete('/todo/:todoId', todoController.delete);

module.exports = router;