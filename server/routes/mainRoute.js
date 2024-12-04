const express = require("express");
const router = express.Router();
const userRoute=require("./userRoute")
const adRoute=require("./adRoute")

router.use("/user/",userRoute) //users
router.use("/ads/",adRoute)

module.exports=router
