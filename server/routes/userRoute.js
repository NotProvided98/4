const express = require("express");
const router = express.Router();
const {logIn, checkToken}=require("../controller/usersContorller")

router.post("/login",logIn)
router.get("/token",checkToken)

module.exports=router