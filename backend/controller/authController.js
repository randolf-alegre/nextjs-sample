const { generateSalt, decryptPassword } = require("../utils");
const { addUser, findUserByEmail } = require("../service/userQuery");
const JWTOKEN = require("jsonwebtoken");

exports.signup = async (email, password) => {
  try {
    if (!email) {
      throw new Error("Email is required.");
    }

    if (!password) {
      throw new Error("Password is required.");
    }

    const selectedUser = await findUserByEmail(email);

    if (selectedUser) {
      throw new Error("Email already exist.");
    }

    const hashPassword = await generateSalt(password);
    const user = await addUser(email, hashPassword);
    return user;
  } catch (error) {
    throw error;
  }
};

exports.signin = async (email, password) => {
  try {
    if (!email) {
      throw new Error("Email is required.");
    }

    if (!password) {
      throw new Error("Password is required.");
    }

    const selectedUser = await findUserByEmail(email);

    if (!selectedUser) {
      throw new Error("Incorrect email or password.");
    }

    await decryptPassword(password, selectedUser.password);
    const token = JWTOKEN.sign(selectedUser, process.env.TOKEN_SECRET);

    return {
      ...selectedUser,
      token,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
