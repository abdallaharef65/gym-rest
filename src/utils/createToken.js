const jwt = require("jsonwebtoken");
const createToken = (user) => {
  return jwt.sign({ userId: user.id, email: user.email }, "secret_key", {
    expiresIn: "1d",
  });
};

module.exports = createToken;
