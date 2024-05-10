const express = require("express");
const pool = require("../../../../pool");
const usersDelete = express.Router();

usersDelete.delete("/", async (req, res) => {
  try {
    const { role_id } = req.query;
    const rowsDelete = await pool.query(
      `DELETE FROM public."Role_Screens" WHERE role_id = $1`,
      [role_id]
    );
    res.json({
      success: true,
      msg: "Role_Screens was deleted successfully.",
    });
  } catch ({ message }) {
    res.json({ success: false, message });
  }
});

module.exports = usersDelete;
