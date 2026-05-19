const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    console.log("HEADERS:", req.headers);
console.log("COOKIE HEADER:", req.headers.cookie);

    // cookie check
    if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    // header check
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;

        if (authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
    }

    console.log("FINAL TOKEN:", token);

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token, authorization denied'
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'User no longer exists'
            });
        }

        next();

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized'
        });
    }
};

module.exports = protect;