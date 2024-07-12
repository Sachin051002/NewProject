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

exports.userImage = async (req,res)=>{
    try{
        const fileName = req.params;
        console.log(fileName);
        res.send()
        // if (existingUser.fileName) {
        //     const filePath = path.resolve("files/images/"+existingUser.fileName);
        //     res.sendFile(filePath, (err) => {
        //         if (err) {
        //             console.error('Error sending file:', err);
        //         }
        //     });
        // }
    }
    catch(e){
        res.status(500).send(e)
    }
}