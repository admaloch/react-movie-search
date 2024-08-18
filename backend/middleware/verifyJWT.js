const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
            }

            req.user = decoded.UserInfo.id; // Attach user ID to req.user
            req.username = decoded.UserInfo.username; // Optionally attach username
            req.isadmin = decoded.UserInfo.isadmin; // Attach roles to req.roles

            next();
        }
    );
};

module.exports = verifyJWT;
