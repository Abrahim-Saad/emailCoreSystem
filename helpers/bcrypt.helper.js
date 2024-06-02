const bcrypt = require("bcrypt");
const saltrounds = 5;


exports.hash = (text) => {
    return bcrypt.hash(text, saltrounds);
}


exports.compare = (text, hash) => {
    return bcrypt.compare(text, hash);
};