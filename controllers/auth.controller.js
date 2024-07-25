const db = require('../config/dbConfig');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const smtpTransport = require('nodemailer-smtp-transport');
const { createHash, compareHash, createToken } = require("../utility/password");
const fs = require('fs');
const path = require('path');
const userModel = db.user;
const Otp=db.otp;
const transporter = nodemailer.createTransport(
    smtpTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        auth: {
            user: "pvarshney@mckinsol.com",
            pass: "bkM2swVAHEC73qQI",
        },
        tls: {
            rejectUnauthorized: false,
        },
    })
);
exports.login = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ where: { email: req.body.email} })
        console.log(existingUser)
        if (existingUser) {
            if (await compareHash(req.body.password, existingUser.password)) {
                const token = await createToken(existingUser);
                const expiresIn = new Date(Date.now() + 24 * 60 * 60 * 1000);
                res.setHeader("Authorization", token);
                res.setHeader("jwt_token", token);
                res.status(200).send({ msg: "Login Successfully.", token, email:existingUser.email })
            }
            else {
                res.status(400).send({ msg: "Password is incorrect." })
            }
        }
        else {
            res.status(404).send({ msg: "Email id does not exist." })
        }
    } catch (e) {
        res.status(500).send(e);
    }
}
exports.register = async (req, res) => {
    console.log("This is a register request:", req.body);
    try {
        if (req.file) {
            req.body.fileName = req.file.filename;
        }
        var { firstName, lastName, email, password,phoneNumber,address, fileName } = req.body;
        const existingUser = await userModel.findOne({ where: { email} });
        if (existingUser) {
            if (req.file) {
                const filePath = path.resolve(`files/images/${req.file.filename}`);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("File deleted successfully.");
                    }
                });
            }
            return res.status(409).send({ msg: "User already exists." });
        }
        console.log("New user registration attempt.");
        const otp = crypto.randomInt(1000, 9999).toString();
       password = await createHash(req.body.password);
        const newUser = await userModel.create({
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            address,
            fileName,
        });
        await Otp.create({
            otp,
            email
        });
        const mailOptions = {
            from: {
                name: 'SPOT',
                address: 'spot@support.com'
            },
            to: email,
            subject: 'Your OTP for Registration',
            text: `Your OTP for registration is: ${otp}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).send({ error: "Error sending email." });
            }
            console.log('Email sent:', info.response);
            res.status(200).send({ msg: " Please check your email for the OTP." });
        });
    } catch (e) {
        console.error("Unexpected error during registration:", e);
        res.status(500).send({ error: "Internal server error." });
    }
};
exports.verify = async (req, res) => {
    const { otp } = req.body;
    try {
        const otpRecord = await Otp.findOne({
            where: {
                otp
            }
        });
        if (!otpRecord) {
            return res.status(400).send({ error: "Invalid OTP." });
        }
        await Otp.destroy({
            where: {
                otp
            }
        });
        // await userModel.update({isActive:true},{where:{email}})
        res.status(200).send({ msg: "OTP verified successfully." });
    } catch (error) {
        console.error("Error verifying OTP:", error);
        res.status(500).send({ error: "Internal server error." });
    }
};
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