const {
  getProperties,
} = require("../../../backend/controller/propertiesController");
const { verifyToken } = require("../../../backend/middleware");

export default async function handler(req, res) {
  let response = [];

  try {
    const { cookies } = req;

    if (!cookies.token) {
      throw new Error("Token is required.");
    }

    const { token } = cookies;

    verifyToken(token);

    switch (req.method) {
      case "GET": {
        const data = await getProperties();
        response = data;
        break;
      }
      case "POST": {
        break;
      }
    }
    return res.status(200).send({ data: response });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ data: "Error with your query." });
  }
}
