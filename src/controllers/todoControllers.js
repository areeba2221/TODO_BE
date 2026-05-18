// const Todo = require('../models/Todo');

// // Read operation all
// exports.getTodos = async (req, res) => {
//     try {
//         const todos = await Todo.find();
//         res.json(todos);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// };

// // Create operation
// exports.createTodo = async (req, res) => {
//     const { description } = req.body;
//     try {
//         const newTodo = new Todo({ description });
//         await newTodo.save();
//         res.status(201).json(newTodo);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };

// // Update operation
// exports.updateTodo = async (req, res) => {
//     try {
//         const updatedTodo = await Todo.findByIdAndUpdate(
//             req.params.id,
//             req.body,
//             { new: true, runValidators: true }
//         );
//         if (!updatedTodo) {
//             return res.status(404).json({ message: "Todo not found" });
//         }
//         res.json(updatedTodo);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ message: err.message });
//     }
// };

// // Delete operation
// exports.deleteTodo = async (req, res) => {
//     const { id } = req.params;
//     try {
//         const deletedTodo = await Todo.findByIdAndDelete(id);
//         if (!deletedTodo) {
//             return res.status(404).json({ message: "Todo not found" });
//         }
//         res.status(200).json({ message: "Deleted successfully" });
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// };





const todoService = require('../services/todoservice');
const mongoose = require('mongoose');

// Get all todos
exports.getTodos = async (req, res) => {
    try {
        const todos = await todoService.getAllTodos();

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

        const newTodo = await todoService.createTodo(description);

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