const express = require("express");
const pool = require("../../../../pool");
const usersDelete = express.Router();

usersDelete.delete("/", async (req, res) => {
  try {
    const { id } = req.query;
    const { rows } = await pool.query(
      `DELETE FROM public."user" WHERE id = $1`,
      [id]
    );
    res.json({
      success: true,
      msg: "user was deleted successfully.",
      data: rows,
    });
  } catch ({ message }) {
    res.json({ success: false, message });
  }
});

module.exports = usersDelete;
