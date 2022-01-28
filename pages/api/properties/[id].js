const {
  getPropertyById,
} = require("../../../backend/controller/propertiesController");

export default async function handler(req, res) {
  let response = [];

  try {
    switch (req.method) {
      case "GET": {
        const { id } = req.query;
        const data = await getPropertyById(id);
        response = data;
        break;
      }
      default: {
        return res.status(403).send({ message: "Page does not exist" });
      }
    }
    return res.status(200).send({ data: response });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ message: "Error with your query." });
  }
}
