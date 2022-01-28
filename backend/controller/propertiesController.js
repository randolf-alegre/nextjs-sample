const { getProperties, getPropertyById } = require("../service/propertyQuery");

exports.getProperties = async () => {
  try {
    return await getProperties();
  } catch (error) {
    throw error;
  }
};

exports.getPropertyById = async (id) => {
  try {
    const response = await getPropertyById(id);
    let property = null;

    if (response && response.length) {
      property = response.pop();
    }

    return property;
  } catch (error) {
    throw error;
  }
};
