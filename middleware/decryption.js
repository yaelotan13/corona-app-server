const CryptoJS = require('crypto-js');
const { CRYPTO_KEY } = require('../config');

function decryption (req, res, next) {
  const { id } = req.body;
  const decryptedToken = CryptoJS.AES.decrypt(id, CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
  req.body.decrypted = decryptedToken.split('.');
  delete req.body.id;

  next();
}

module.exports = decryption;