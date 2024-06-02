const crypto = require('crypto');


exports.encrypt = (text) => {
    let cipher = crypto.createCipher('aes-256-cbc', process.env.TOKEN_SECRET_KEY);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}


exports.decrypt = (text) => {
    let decipher = crypto.createDecipher('aes-256-cbc', process.env.TOKEN_SECRET_KEY);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}