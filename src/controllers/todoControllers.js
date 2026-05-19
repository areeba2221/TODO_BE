const todoService = require('../services/todoservice');
const mongoose = require('mongoose');

// Get all todos
exports.getTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos(req.user._id);

        res.status(200).json({
            success: true,
            data: todos
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Create todo
exports.createTodo = async (req, res) => {
    try {

        console.log(req.body);

        const { description } = req.body;

        // Validation
        if (!description || description.trim() === '') {
            return res.status(400).json({
                success: false,
                message: 'Description is required'
            });
        }

        const newTodo = await todoService.createTodo(description, req.user._id);

        res.status(201).json({
            success: true,
            data: newTodo
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Update todo
exports.updateTodo = async (req, res) => {
    try {
        const { id } = req.params;

        // ID validation
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Todo ID'
            });
        }

        const updatedTodo = await todoService.updateTodo(id, req.body);

        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        res.status(200).json({
            success: true,
            data: updatedTodo
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;

        // ID validation
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid Todo ID'
            });
        }

        const deletedTodo = await todoService.deleteTodo(id);

        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: 'Todo not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Todo deleted successfully'
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
};