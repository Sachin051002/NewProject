const db = require("../config/dbConfig");
const { createHash, compareHash, createToken } = require("../utility/password");
const fs = require('fs');
const path = require('path');

const userModel = db.user;

exports.login = async (req, res) => {
    const existingUser = await userModel.findOne({ where: { email: req.body.email } })
    if (existingUser) {
        if (await compareHash(req.body.password, existingUser.password)) {

            const token = await createToken(existingUser);
            const expiresIn = new Date(Date.now() + 24 * 60 * 60 * 1000);

            res.setHeader("AuthorizationToken", token);
            res.status(200).send({ msg: "Login Successfully." })
        }
        else {
            res.status(200).send({ msg: "Password is incorrect." })
        }
    }
    else {
        res.status(200).send({ msg: "Email id does not exist." })

    }
}



exports.register = async (req, res) => {

    req.body.fileName = req.file.filename;
    const existingUser = await userModel.findOne({ where: { email: req.body.email } })
    if (existingUser) {
        const filePath = path.resolve(`files/images/${req.file.filename}`)
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(err);
            }
            // console.log("file deleted");
        });
        res.status(200).send({ msg: "User already exist." })

    }
    else {

        req.body.password = await createHash(req.body.password);

        userModel.create(req.body).then(data => {
            res.status(200).send({ msg: "User registered successfully." })
        }, err => {
            res.status(400).send({ err })
        })
    }
}
