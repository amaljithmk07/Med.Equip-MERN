const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    // console.log(req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    req.userData = {
      userId: decodedToken.userId,
      userEmail: decodedToken.email,
      userRole: decodedToken.userRole,
    };
    console.log(req.userData);

    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
7;
