const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { jwt_secretToken } = require('../config/env');

exports.createHash = async (password)=>{
    return await bcrypt.hash(password,11);
}

exports.compareHash = async (enteredPassword,existingPassword)=>{
    return await bcrypt.compare(enteredPassword,existingPassword);
}

exports.createToken = async (user)=>{
    const signatureKey = {
        id:user.id,
        email:user.email,
        password:user.password
    }

    return jwt.sign(signatureKey, jwt_secretToken, { expiresIn: '24h' });
}