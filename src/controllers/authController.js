const User = require('../models/User');
const authService = require('../services/authService');
const generateToken = require('../utils/generateToken');

const cookieOption = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
    maxAge: 24 * 60 * 60 * 1000
};

const validateRegisterInput = (name, email, password) => {
    const errors = [];

    if (!name) {
        errors.push('Name is required');
    } else if (name.trim().length < 3) {
        errors.push('Name must be at least 3 characters');
    } else if (name.trim().length > 30) {
        errors.push('Name must be less than 30 characters');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!password) {
        errors.push('Password is required');
    } else if (!passwordRegex.test(password)) {
        errors.push('Password must be at least 8 characters and include uppercase, lowercase, number and special character (!@#$%^&*)');
    }

    return errors;
};

const validateLoginInput = (email, password) => {
    const errors = [];

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
        errors.push('Email is required');
    } else if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }

    if (!password) {
        errors.push('Password is required');
    } else if (password.length < 8) {
        errors.push('Password must be at least 8 characters');
    }

    return errors;
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const errors = validateRegisterInput(name, email, password);
        if (errors.length > 0) {
            return res.status(422).json({
                success: false,
                message: errors[0],   
                errors                
            });
        }

        const user = await authService.registerUser(name, email.toLowerCase().trim(), password);
        const token = generateToken(user._id);

        res.status(201)
        .cookie('token', token, cookieOption)
        .json({
            success: true,
            message: "Registration successful"
        });

    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const errors = validateLoginInput(email, password);
        if (errors.length > 0) {
            return res.status(422).json({
                success: false,
                message: errors[0],  
                errors                
            });
        }

        const user = await authService.loginUser(email.toLowerCase().trim(), password);
        const token = generateToken(user._id);

        console.log("COOKIE SET");
        res.status(200)
        .cookie('token', token, cookieOption)
        .json({ success: true, token, message: "Login successful" });

    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};
exports.getMe = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (err) {
        res.status(401).json({ success: false, message: err.message });
    }
};
exports.logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/'
        });
        res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};