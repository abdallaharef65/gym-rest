const express = require("express");
const pool = require("../../../../pool");
const hallsDelete = express.Router();
const { requireAuth } = require("../../../../middleware/authMiddleware");
hallsDelete.delete("/",requireAuth, async (req, res) => {
  try {
    const { id } = req.query;
    const { rows } = await pool.query(
      `DELETE FROM public."halls" WHERE id = $1`,
      [id]
    );
    res.json({
      success: true,
      msg: "halls was deleted successfully.",
      data: rows,
    });
  } catch ({ message }) {
    res.json({ success: false, message });
  }
});

module.exports = hallsDelete;
