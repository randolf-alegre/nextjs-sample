const cookie = require("cookie");
const {
  signup,
  signin,
} = require("../../../backend/controller/authController");

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      throw new Error("Route not supported.");
    }

    const { action } = req.query;
    let response = null;
    const { email, password } = req.body;
    switch (action.toLowerCase()) {
      case "signup": {
        response = await signup(email, password);
        break;
      }

      case "logout": {
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", "", {
            httpOnly: true,
            sameSite: true,
            path: "/",
            expires: new Date(0),
          })
        );
        response = "logout successfully.";
        break;
      }

      case "signin": {
        const user = await signin(email, password);
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", user.token, {
            httpOnly: true,
            sameSite: true,
            path: "/",
          })
        );
        response = user;
        break;
      }
    }

    return res.status(200).send({ data: response });
  } catch (error) {
    return res.status(400).send({ message: error.message });
  }
}
