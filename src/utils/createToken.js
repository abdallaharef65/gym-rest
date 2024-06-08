const jwt = require("jsonwebtoken");
const createToken = (user) => {
  return jwt.sign({ userId: user.id, role_id: user.role_id }, "secret_key", {
    expiresIn: "1d",
  });
};

module.exports = createToken;
