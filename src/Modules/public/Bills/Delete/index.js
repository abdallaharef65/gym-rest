const express = require("express");
const pool = require("../../../../pool");
const billsDelete = express.Router();

billsDelete.delete("/", async (req, res) => {
  try {
    const { id } = req.query;
    const { rows } = await pool.query(
      `DELETE FROM public."Bills" WHERE id = $1`,
      [id]
    );
    res.json({
      success: true,
      msg: "Bills was deleted successfully.",
      data: rows,
    });
  } catch ({ message }) {
    res.json({ success: false, message });
  }
});

module.exports = billsDelete;
