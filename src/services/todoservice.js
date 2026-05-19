const Todo = require('../models/Todo');

// Get all todos
const getAllTodos = async (userId) => {
    return await Todo.find({ user: userId});
};

//create todo
const createTodo = async (description, userId) => {

    return await Todo.create({
        description,
        user: userId
    });

};

// Update todo
const updateTodo = async (id, data) => {
    return await Todo.findByIdAndUpdate(
        id,
        data,
        { new: true, runValidators: true }
    );
};

// Delete todo
const deleteTodo = async (id) => {
    return await Todo.findByIdAndDelete(id);
};

module.exports = {
    getAllTodos,
    createTodo,
    updateTodo,
    deleteTodo
};