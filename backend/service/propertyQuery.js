const { connectToDatabase } = require("../../lib/mongodb");

exports.getProperties = async () => {
  try {
    let { db } = await connectToDatabase();
    const properties = await db
      .collection("propertyData")
      .find({})
      .project({ propertyName: 1, propertyId: 1, _id: 0 })
      .limit(20)
      .toArray();
    return properties;
  } catch (error) {
    throw error;
  }
};

exports.getPropertyById = async (id) => {
  try {
    let { db } = await connectToDatabase();

    const properties = await db
      .collection("propertyData")
      .find({ propertyId: Number.parseInt(id) })
      .project({ income: 1, expense: 1, _id: 0 })
      .limit(1)
      .toArray();
    return properties;
  } catch (error) {
    throw error;
  }
};
