const { connectToDatabase } = require("../../lib/mongodb");

exports.addUser = async (email, password) => {
  try {
    let { db } = await connectToDatabase();

    const user = await db.collection("users").insert({
      email,
      password,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

exports.findUserByEmail = async (email) => {
  try {
    let user = null;
    let { db } = await connectToDatabase();

    const result = await db
      .collection("users")
      .find({ email: email })
      .limit(1)
      .toArray();

    if (result.length) {
      user = result.pop();
    }

    return user;
  } catch (error) {
    throw error;
  }
};
