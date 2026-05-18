
const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        minlength: [3, 'Description must be at least 3 characters']
    },

    completed: { type: Boolean, default: false },

    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    createdAt: { type: Date, default: Date.now }

}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', TodoSchema);