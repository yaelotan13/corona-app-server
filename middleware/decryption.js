const CryptoJS = require('crypto-js');
const { CRYPTO_KEY } = require('../config');

function decryption (req, res, next) {
  const { id } = req.body;
  console.log(`id is: ${id}`);
  const decryptedToken = CryptoJS.AES.decrypt(id, CRYPTO_KEY).toString(CryptoJS.enc.Utf8);
  console.log(`decryptedToken is: ${decryptedToken}`);
  req.body.decrypted = decryptedToken.split('.');
  console.log(`req.body.decrypted is: ${req.body.decrypted}`);
  delete req.body.id;

  next();
}

module.exports = decryption;