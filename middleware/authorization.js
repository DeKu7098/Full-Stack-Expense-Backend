const jwt = require('jsonwebtoken');
const User = require('../model/user');

const authenticate = (req, res, next) => {
    try{
       const token = req.header('Authorization');
    //    console.log('1');
       const user = jwt.verify(token, 'secretKey');
    //    console.log('2');
       User.findByPk(user.userId).then(user => {
        req.user = user;
        // console.log('3');
        next();
       })
    } catch(err) {
        console.log(err);
        return res.status(401).json({success: false})
    }
}

module.exports = { authenticate };