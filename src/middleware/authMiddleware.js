const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  console.log(token);
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "secret_key", (err, decodedToken) => {
      if (err) {
        res.json({
          success: false,
          msg: "authorization error.",
        });
      } else {
        next();
      }
    });
  } else {
    res.json({
      success: false,
      msg: "authorization error.",
    });
  }
};

module.exports = { requireAuth };
