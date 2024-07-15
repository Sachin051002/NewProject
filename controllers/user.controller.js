const db = require("../config/dbConfig");
const path = require('path');
const fs = require('fs');
const userModel = db.user;

exports.userProfile = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ where: { id: req.user.id } })
        res.status(200).json({ data: existingUser })
    }
    catch (e) {
        res.status(500).send(e);
    }
}

exports.updateProfile = async (req, res) => {
    try {
        if (req.file) {
            req.body.fileName = req.file.filename;
            await userModel.findOne({ where: { id: req.user.id } })
                .then(data => {
                    if (data.fileName) {
                        const filePath = path.resolve(`files/images/${data.fileName}`)
                        fs.unlink(filePath, (err) => {
                            if (err) {
                                console.log("No old image found to delete.");
                            }
                            // console.log("file deleted");
                        });
                    }
                })
        }
        const [updatedRows] = await userModel.update(req.body, {
            where: { id: req.user.id }
        });

        if (updatedRows === 0) {
            return res.status(404).send({ msg: "User not found." });
        }

        res.status(200).send({ msg: "User profile updated successfully." });

    } catch (e) {
        res.status(500).send(e);
    }
}
