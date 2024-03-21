const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token': token
        })

        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user;
        next()
    } catch (e) {
        res.status(401).send({
            err: 'Please authenticate'
        })
    }
}

const hasRoles = (roles = []) => {
    if (typeof roles === 'string') {
        roles = [roles]
    }
    return (
        (req, res, next) => {
            if (roles.length && !roles.some(role => req.user.roles.includes(role))) {
                return res.status(401).json({
                    message: 'Unauthorized'
                })
            }

            next()
        }
    );
}

module.exports = {
    auth,
    hasRoles
}