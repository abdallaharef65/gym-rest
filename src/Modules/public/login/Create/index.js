const express = require("express");
const pool = require("../../../../pool");
const usersPost = express.Router();
const jwt = require("jsonwebtoken");

usersPost.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the username exists
    const result = await pool.query(
      'SELECT * FROM public."user" WHERE email = $1',
      [email]
    );
    const user = result.rows[0];
    console.log(user);

    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Compare the hashed password
    const passwordMatch = password == user.password ? true : false;

    if (!passwordMatch) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "secret_key",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token: token,
      data: user,
    });
  } catch ({ message }) {
    res.json({ success: false, message });
  }
});
module.exports = usersPost;
