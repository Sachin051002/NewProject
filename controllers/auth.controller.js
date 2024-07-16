const db = require("../config/dbConfig");
const { createHash, compareHash, createToken } = require("../utility/password");
const fs = require('fs');
const path = require('path');

const userModel = db.user;

exports.login = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ where: { email: req.body.email } })
        if (existingUser) {
            if (await compareHash(req.body.password, existingUser.password)) {

                const token = await createToken(existingUser);
                const expiresIn = new Date(Date.now() + 24 * 60 * 60 * 1000);

                res.setHeader("Authorization", token);
                res.setHeader("jwt_token", token);
                res.status(200).send({ msg: "Login Successfully.", token })
            }
            else {
                res.status(200).send({ msg: "Password is incorrect." })
            }
        }
        else {
            res.status(200).send({ msg: "Email id does not exist." })
        }
    } catch (e) {
        res.status(500).send(e);
    }
}



exports.register = async (req, res) => {
    console.log("this is a register",req.body);
    try {
        if (req.file) {
            req.body.fileName = req.file.filename;
        }
        const existingUser = await userModel.findOne({ where: { email: req.body.email } })
        if (existingUser) {
            if (req.file) {
                const filePath = path.resolve(`files/images/${req.file.filename}`)
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log(err);
                    }
                    // console.log("file deleted");
                });
            }
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
    } catch (e) {
        res.status(500).send(e);
    }
}

exports.userImage = async (req, res) => {
    try {
        const { fileName } = req.params;
        const filePath = path.resolve(`files/images/${fileName}`);

        if (fileName) {
            res.sendFile(filePath, (err) => {
                if (err) {
                    console.error('Error sending file:', err);
                }
            });
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
}