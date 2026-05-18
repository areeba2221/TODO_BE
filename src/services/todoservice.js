const Todo = require('../models/Todo');

// Get all todos
// const getAllTodos = async () => {
//     return await Todo.find();
// };
const getAllTodos = async (userId) => {
    return await Todo.find({ user: userId});
};

// Create todo
// const createTodo = async (description) => {
//     const todo = new Todo({ description });
//     return await todo.save();
// };
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