const svgCaptcha = require("svg-captcha");

const db = require("../config/dbConfig");
const Captcha = db.captcha;



exports.captcha = async (req, res) => {
    try {

        const captcha = svgCaptcha.create();
        // req.session.captcha = captcha.text;
        const newCaptcha = await Captcha.create({ text: captcha.text });
        const captchaBase64 = Buffer.from(captcha.data).toString("base64");
        // res.json({ captchaBase64,captchaId: newCaptcha.id });
        res.status(200).send({ captcha: captchaBase64, captchaId: newCaptcha.id });

    } catch (error) {
        console.error("Error generating CAPTCHA:", error);
        res
            .status(500)
            .json({ success: false, message: "Internal server error!" });
    }
};



exports.captchaVerify = async (req, res) => {
    try {
        const { captchaId, captchaText } = req.body;

        const captcha = await Captcha.findOne({ where: { id: captchaId } });

        if (captcha && captcha.text === captchaText) {
            res.json({ success: true, message: 'CAPTCHA verified successfully.' });
        } else {
            res.json({ success: false, message: 'Invalid CAPTCHA.' });
        }

    } catch (error) {
        console.error("Error verifying CAPTCHA:", error);
        return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
    }
};


// exports.captcha =async (req, res) => {
//     try {
//         const captcha = svgCaptcha.create({
//             size: 6,
//             color: true,
//             background: "#FFFFFF",
//         });
//         // req.session.captcha = captcha.text;
//         // const storedCaptcha = req.session.captcha;
//         const newCaptcha = captcha.text;
//         await Captcha.update({ captcha1: newCaptcha }, { where: { id: 1 } });
//         const captchaBase64 = Buffer.from(captcha.data).toString("base64");
//         res.status(200).json(captchaBase64);
//     } catch (error) {
//         console.error("Error generating CAPTCHA:", error);
//         res
//             .status(500)
//             .json({ success: false, message: "Internal server error!" });
//     }
// };

// exports.captchaVerify = async (req, res) => {
//     try {
//         const { captcha, captcha2 } = req.body;

//         if (!captcha && !captcha2) {
//             return res
//                 .status(400)
//                 .json({ success: false, message: "CAPTCHA not found!" });
//         }

//         if (captcha) {
//             console.log("user captcha...", captcha);

//             const dbCaptcha = await Captcha.findOne({ where: { id: 1 } });
//             console.log(dbCaptcha)
//             const storedCaptcha = dbCaptcha.captcha1;
//             console.log("stored captcha...", storedCaptcha);

//             if (captcha === storedCaptcha) {
//                 return res
//                     .status(200)
//                     .json({ success: true, message: "CAPTCHA verified successfully!" });
//             } else {
//                 return res
//                     .status(400)
//                     .json({ success: false, message: "CAPTCHA verification failed!" });
//             }
//         }

//         if (captcha2) {
//             console.log("user captcha2...", captcha2);

//             const dbCaptcha = await Captcha.findOne({ where: { id: 2 } });
//             const storedCaptcha2 = dbCaptcha.captcha2;
//             console.log("stored captcha2...", storedCaptcha2);

//             if (captcha2 === storedCaptcha2) {
//                 return res.status(200).json({
//                     success: true,
//                     message: "CAPTCHA2 verified successfully!",
//                 });
//             } else {
//                 return res
//                     .status(400)
//                     .json({ success: false, message: "CAPTCHA2 verification failed!" });
//             }
//         }
//     } catch (error) {
//         console.error("Error verifying CAPTCHA:", error);
//         return res
//             .status(500)
//             .json({ success: false, message: "Internal server error" });
//     }
// };

// exports.captcha2 = async (req, res) => {
//     try {
//         const captcha2 = svgCaptcha.create({
//             size: 6,
//             color: true,
//             background: "#FFFFFF",
//         });
//         const newCaptcha = captcha2.text;
//         console.log("new captcha2...", newCaptcha);
//         await Captcha.update({ captcha2: newCaptcha }, { where: { id: 2 } });
//         const captchaBase64 = Buffer.from(captcha2.data).toString("base64");
//         res.status(200).json(captchaBase64);
//     } catch (error) {
//         console.error("Error generating CAPTCHA2:", error);
//         res
//             .status(500)
//             .json({ success: false, message: "Internal server error!" });
//     }
// };