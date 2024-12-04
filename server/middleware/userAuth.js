const jwt = require("jsonwebtoken")

const userToken = async (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return res.status(404).send("Log in first (no token)")
    }
    try {
        // const verify=await jwt.verify(token, process.env.JWT_HASH)
        // console.log(verify)
        await jwt.verify(token, process.env.JWT_HASH)
        next()
    } catch (error) {
        res.status(500).send("internal error")
    }
}

module.exports = { userToken }