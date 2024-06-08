const express = require("express");
const pool = require("../../../../pool");
const coursesUpdate = express.Router();
const { requireAuth } = require("../../../../middleware/authMiddleware");
const jwt = require("jsonwebtoken");
coursesUpdate.put("/", requireAuth, async (req, res) => {
  try {
    const { id } = req.query;
    const changed = [];
    let i = 1;
    for (let prop in req.body) {
      changed.push(`${prop} = $${i++}`);
    }

    const token = req.headers["authorization"];
    jwt.verify(token, "secret_key", async (err, decodedToken) => {
      if (decodedToken.role_id == 3) {
        res.json({
          success: false,
          msg: "authorization error.",
        });
      } else {
        const { rows } = await pool.query(
          `UPDATE public."courses" SET ${changed} WHERE 1=1 AND id=$${i} RETURNING *`,
          [...Object.values(req.body), id]
        );
        res.json({
          success: true,
          msg: "courses was updated successfully.",
          data: rows,
        });
      }
    });
  } catch ({ message }) {
    res.json({ success: false, message });
  }
});

module.exports = coursesUpdate;
