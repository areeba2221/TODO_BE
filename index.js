const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT;



app.use(cors());
app.use(express.json());

let TodoItems = [];

//read operation all
app.get('/api/todos', (req, res) => {
    return res.json(TodoItems);
});

//create operation
app.post('/api/todos', (req, res) => {
    const {description} = req.body;
    const todoObj = {
        id: Date.now(),
        description,
        createdAt : Date.now()
    }
    TodoItems.push(todoObj);
    res.status(201).json(todoObj);
});

//update operation
app.put("/api/todos/:id", (req, res) => {

    const { id } = req.params;
    const { description, status } = req.body;


    const todoObj = TodoItems.find(t => t.id == id);

     if (!todoObj) {

        return res.status(404).json({message: "Todo not found"});

    }

    todoObj.description = description ?? todoObj.description;
    todoObj.completed = req.body.completed ?? todoObj.completed;

    res.status(200).json(todoObj);

});

//delete operation
app.delete("/api/todos/:id", (req, res) => {

    const { id } = req.params;
    TodoItems = TodoItems.filter((t) => t.id != id);

    res.status(200).json({ message: "Deleted successfully"});

});

app.listen(PORT, () => {
    console.log('Server connected' );
});
