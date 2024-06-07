const express = require("express");
const pool = require("../../../../pool");
const appointmentsDelete = express.Router();
const { requireAuth } = require("../../../../middleware/authMiddleware");
appointmentsDelete.delete("/",requireAuth, async (req, res) => {
  try {
    const { id, sharedid } = req.query;
    const { rows } = id
      ? await pool.query(`DELETE FROM public."appointments" WHERE id = $1`, [
          id,
        ])
      : await pool.query(
          `DELETE FROM public."appointments" WHERE sharedid = $1`,
          [sharedid]
        );
    res.json({
      success: true,
      msg: "appointments was deleted successfully.",
      data: rows,
    });
  } catch ({ message }) {
    res.json({ success: false, message });
  }
});

module.exports = appointmentsDelete;
