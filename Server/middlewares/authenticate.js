// For jwt Token
const jwt = require('jsonwebtoken')

// User
const User = require('../Schema/user')

const Authenticate = async (req, res, next) => {
    try {

        // Getting Token From the cookies
        const token = req.cookies.jwtoken

        // Verifing Cookies
        const VerifyToken = jwt.verify(token, process.env.SECRETKEY)

        // Getting User Data
        const rootUser = await User.findOne({_id : VerifyToken._id})
        
        if (!rootUser) {
            throw new Error("Invalid Upload")
        }
        
        req.token = token
        req.rootUser = rootUser
        req.UserId = rootUser._id;

        next()
    }
    catch (err) {
        res.status(401).json({ message : "invalid request"})
        console.log(err)
    }
}

module.exports = Authenticate