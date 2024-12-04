const express = require("express");
const router = express.Router();
const {getAllAds, deleteAd, updateAd, createAd}=require("../controller/adsController")
const {userToken}=require("../middleware/userAuth")

router.get("/all", getAllAds)
router.delete("/deleteAd", userToken, deleteAd)
router.put("/updateAd",userToken,updateAd)
router.post("/createAd",userToken,createAd)

module.exports=router