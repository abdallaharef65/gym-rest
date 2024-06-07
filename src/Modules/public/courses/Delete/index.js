const express = require("express");
const pool = require("../../../../pool");
const coursesDelete = express.Router();
const { requireAuth } = require("../../../../middleware/authMiddleware");
coursesDelete.delete("/", requireAuth,async (req, res) => {
  try {
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
  } catch ({ message }) {
    res.json({ success: false, message });
  }
});

module.exports = coursesDelete;
