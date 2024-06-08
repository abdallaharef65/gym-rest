const express = require("express");
const pool = require("../../../../pool");
const coursesDelete = express.Router();
const { requireAuth } = require("../../../../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
coursesDelete.delete("/", requireAuth, async (req, res) => {
  try {
    const token = req.headers["authorization"];
    jwt.verify(token, "secret_key", async (err, decodedToken) => {
      if (decodedToken.role_id == 3) {
        res.json({
          success: false,
          msg: "authorization error.",
        });
      } else {
        const { id } = req.query;
        const { rows } = await pool.query(
          `DELETE FROM public."courses" WHERE id = $1`,
          [id]
        );
        res.json({
          success: true,
          msg: "courses was deleted successfully.",
          data: rows,
        });
      }
    });
  } catch ({ message }) {
    res.json({ success: false, message });
  }
});

module.exports = coursesDelete;
