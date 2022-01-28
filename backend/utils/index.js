const bcrypt = require("bcryptjs");
const SALT_ROUND = 10;

exports.generateSalt = async (password) => {
  try {
    return await new Promise((resolve, reject) => {
      bcrypt.genSalt(SALT_ROUND, (saltError, salt) => {
        if (saltError) {
          reject(saltError);
        } else {
          bcrypt.hash(password, salt, (hashError, hash) => {
            if (hashError) {
              reject(hashError);
            } else {
              resolve(hash);
            }
          });
        }
      });
    });
  } catch (error) {
    throw error;
  }
};

exports.decryptPassword = async (password, hash) => {
  try {
    return await new Promise((resolve, reject) => {
      bcrypt.compare(password, hash, function (error, isMatch) {
        if (error) {
          reject(reject);
        } else if (!isMatch) {
          reject(new Error("Password does not match."));
        } else {
          resolve(true);
        }
      });
    });
  } catch (error) {
    throw error;
  }
};
