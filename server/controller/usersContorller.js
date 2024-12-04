const UserModel = require("../schema/userSchema")
const jwt = require("jsonwebtoken")

const logIn = async (req, res) => { //post
    try {
        const user = await UserModel.findOne({ email: req.body.email })
        if (!user || user.password !== req.body.password) {
            return res.status(400).send("Email or password are wrong")
        }
        const payload = { userId: user._id, email: user.email }
        const token = jwt.sign(payload, process.env.JWT_HASH, { expiresIn: "1h" })

        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.MODE === "production",
            maxAge: 60 * 60 * 1000,   //1 hour (3600000 ms)
            sameSite: "Strict",
        })
        res.status(200).send("Logging in")
    } catch (error) {
        return res.status(500).send("Internal error")
    }
}
const checkToken = async (req, res) => { //get
    try {
        const token = req.cookies.access_token
        if (!token) {
            return res.status(404).send("Guest")
        }
        await jwt.verify(token, process.env.JWT_HASH)
        res.status(200).send("User")
    } catch (error) {
        res.status(500).send("Guest")
        // res.status(500).send(error)
    }
}

module.exports = { logIn, checkToken }