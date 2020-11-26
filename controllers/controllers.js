const ToDo = require('../todoschema');

module.exports =
{
    add: async (req, res) => {
        const { todoId, todoText } = req.body;
        const todo = new ToDo({
            todoId: todoId,
            todoText: todoText
        });
        todo.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Todo"
                });
            });
    },

    read: (req, res, next) => {
        ToDo.find()
            .then(notes => {
                res.send(notes);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving todos."
                });
            });
    },
    singleToDo: (req, res, next) => {

    },
    update: (req, res, next) => {
        ToDo.findByIdAndUpdate(req.params.todoId, {
            todoId: req.body.todoId || "Untitled Todo",
            todoText: req.body.todoText
        }, { new: true })
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message: "Todo not found with id " + req.params.todoId
                    });
                }
                res.send(todo);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    return res.status(404).send({
                        message: "Todo not found with id " + req.params.todoId
                    });
                }
                return res.status(500).send({
                    message: "Error updating Todo with id " + req.params.todoId
                });
            });
    },
    delete: (req, res, next) => {
        ToDo.findByIdAndRemove(req.params.todoId)
            .then(todo => {
                if (!todo) {
                    return res.status(404).send({
                        message: "Todo not found with id " + req.params.todoId
                    });
                }
                res.send({ message: "Todo deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Todo not found with id " + req.params.todoId
                    });
                }
                return res.status(500).send({
                    message: "Could not delete todo with id " + req.params.todoId
                });
            });
    }

}