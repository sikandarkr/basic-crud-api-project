var mongoose = require('mongoose');

var ToDoSchema = new mongoose.Schema({
    todoId: Number,
    todoText: String,
});

module.exports = mongoose.model('todo', ToDoSchema);
