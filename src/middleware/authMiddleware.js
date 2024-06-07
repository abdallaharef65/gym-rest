const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.headers["authorization"];
  // console.log("token>>>>>>>>>>", req.header);
  // console.log("token>>>>>>>>>>", token);
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, "secret_key", (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        next();
      }
    });
  } else {
    console.log("error authorization");
  }
};

module.exports = { requireAuth };
