const AdModel = require("../schema/adSchema")

const getAllAds = async (req, res) => { //get
    try {
        const allAds = await AdModel.find()
        if (!allAds || allAds.length == 0) {
            return res.status(404).json("No ads available")
        }
        res.status(200).send(allAds)
    } catch (error) {
        res.status(500).send("internal arror")
    }
}
const deleteAd = async (req, res) => { //delete
    try {
        const deleteTheAd = await AdModel.deleteOne({ _id: req.body._id })
        if (deleteTheAd.deletedCount == 0) {
            return res.status(404).json("Not found (ad)")
        }
        res.status(200).send("Ad has been deleted")
    } catch (error) {
        res.status(500).send("internal arror")
    }
}
const updateAd = async (req, res) => { //put
    try {
        const updateTheAd = await AdModel.updateOne({ _id: req.body._id }, { $set: { title: req.body.title, text: req.body.text } })
        if (updateTheAd.modifiedCount == 0) {
            return res.status(404).json("Not found")
        }
        res.status(200).send("Ad has been updated")
    } catch (error) {
        res.status(500).send("internal arror")
    }
}
const createAd = async (req, res) => { //post
    try {
        if (req.body.title == 0 && req.body.text == 0){
            return res.status(400).send("Title and text must contain something")
        }
            await AdModel.create({ title: req.body.title, text: req.body.text })
        res.status(200).send("Ad has been created")
    } catch (error) {
        res.status(500).send("internal arror")
    }
}

module.exports = { getAllAds, deleteAd, updateAd, createAd }