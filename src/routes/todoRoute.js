const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todoControllers');

const protect = require('../middleware/authMiddleware');

router.get('/' , protect , todoController.getTodos);

router.post('/', todoController.createTodo);

router.put('/:id', todoController.updateTodo);

router.delete('/:id', todoController.deleteTodo);

module.exports = router;