const authService = require('../services/authService');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {

    console.log('r');

    try {

        const { name, email, password } = req.body;

        const user = await authService.registerUser(name, email, password );

        res.status(201).json({
            success: true,
            token: generateToken(user._id)
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

        res.status(200).json({
            success: true,
            token: generateToken(user._id)
        });

    } catch (err) {

        res.status(400).json({
            success: false,
            message: err.message
        });

    }
};