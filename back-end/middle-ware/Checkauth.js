const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    // console.log(req);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");

     console.log(decodedToken);
    req.userData = {
      userId: decodedToken.userId,
      userEmail: decodedToken.userEmail,
      userRole: decodedToken.userRole,
    };
    console.log("req.userdata:", req.userData);

    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Auth failed!", ErrorMessage: error.message });
  }
};
