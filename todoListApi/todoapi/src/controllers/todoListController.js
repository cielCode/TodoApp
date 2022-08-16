const todoListApi = require('../data/todoListApi');


module.exports = {
    getAll:(req, res) => {
        res.json(todoListApi.getAll());
    },
    add:(req, res) => {
        const todo = req.body;
        if(!todo.title || todo.title === ""){
            res.status(500).send("Title is required")
        }
        else{
            res.json(todoListApi.addTodo(todo))
        }
    },
    get:(req, res) => {
        const todo = todoListApi.getTodo(req.params.id);
        if(todo){
        res.json(todo);
        }
        else{
            res.status(404).send("Could not find item with given id")
        }
    },
    update:(req,res) => {
        const updatedTodo = todoListApi.updateTodo(req.params.id, req.body);
        if(updatedTodo){
            res.json(updatedTodo);
        }
         else{
            res.status(404).send("Could not find item with given id")
        }
    },
    check:(req,res) => {
        const checkedTodo = todoListApi.updateTodo(req.params.id, req.body);
        if(checkedTodo){
            res.json(checkedTodo);
        }
         else{
            res.status(404).send("Could not find item with given id")
        }
    },
    delete:(req, res) => {
        const deletedTodo = todoListApi.removeTodo(req.params.id);
        if(deletedTodo){
            res.json(deletedTodo);
        }
         else{
            res.status(404).send("Could not find item with given id")
        }
    }
}