const jwt = require('jsonwebtoken');

const authorizeRole = (role) => {
    return (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'secretkey');

            if (!decoded.userId || decoded.role !== role) {
                return res.status(403).send('Authorization denied');
            }

            next();
        } catch (error) {
            res.status(500).send('Server error');
        }
    };
};

module.exports = authorizeRole;
