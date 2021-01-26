const crypto = require('crypto') ;

function makeSalt() {
    return crypto.randomBytes(3).toString('base64');
}

const salt = makeSalt();
console.log(salt);

function encryptPassword(password, salt) {
    if (!password || !salt) {
        return '';
    }
    const tempSalt = Buffer.from(salt, 'base64');
    return (
        // 10000 代表迭代次数 16代表长度
        crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
    );
}

const token = encryptPassword('a123456',salt);
console.log(token);