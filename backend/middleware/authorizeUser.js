const authorizeUser = (req, res, next) => {
    const userId = req.params.id;
    const loggedInUserId = req.user.id; // Assuming `req.user` contains the logged-in user's information

    if (userId !== loggedInUserId) {
        return res.status(403).json({ error: 'You are not authorized to perform this action' });
    }
    next();
};

module.exports = authorizeUser;
