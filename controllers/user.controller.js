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
        console.log(req.user);

        console.log('update wala');
        if (req.body.file) {
            const base64Data = req.body.file.replace(/^data:image\/png;base64,/, "");
            const imageFileName = `userProfile${req.user.id}.png`;
            const imageDir = path.join('files', 'images');
            const imagePath = path.join(imageDir, imageFileName);

            try {
                // Create directory if it doesn't exist
                if (!fs.existsSync(imageDir)) {
                    fs.mkdirSync(imageDir, { recursive: true });
                }

                // Write base64 image data to file
                await fs.promises.writeFile(imagePath, base64Data, 'base64');

                req.body.fileName = `files/images/${imageFileName}`;

            } catch (err) {
                console.error('Error saving image:', err);
                return res.status(500).send({ error: 'Failed to save image' });
            }
        }
        if (req.file) {
            console.log('file found');
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
