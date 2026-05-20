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

exports.register = async (req, res) => {


    try {

        const { name, email, password } = req.body;

        const user = await authService.registerUser(name, email, password );

        const token = generateToken(user._id);

        res.status(201)
        .cookie('token', token , cookieOption)
        .setHeader("Access-Control-Allow-Credentials", "true")
        .json({
            success: true,
            token,
            message: "Registration successful"
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }
};

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await authService.loginUser( email, password );

        const token = generateToken(user._id);

        console.log("COOKIE SET");

        res.status(200)
        .cookie('token', token , cookieOption)
        .json({
            success: true,
            token,
            message: "Login successful"
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }
};