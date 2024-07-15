const db = require("../config/dbConfig");
const path = require('path');
const userModel = db.user;

exports.userProfile = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ where: { id: req.user.id } })
        res.status(200).json({ data:existingUser })
    }
    catch (e) {
        res.status(500).send(e);
    }
}
