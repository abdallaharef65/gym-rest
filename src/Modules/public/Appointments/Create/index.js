const express = require("express");
const pool = require("../../../../pool");
const appointmentsPost = express.Router();
const uuid = require("uuid");
appointmentsPost.post("/", async (req, res) => {
  //appointments
  try {
    const sharedId = uuid.v4();
    // console.log("post132");
    const fields = Object.keys({ ...req.body, sharedid: sharedId });
    const values = Object.values({ ...req.body, sharedid: sharedId });
    const OrderOfvalues = [];
    for (let i = 0; i < values.length; ++i) {
      OrderOfvalues.push(`$${i + 1}`);
    }
    //INSERT INTO public."Bills"(bill_number,date,bill_amount,bill_discount,notes,appointment_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *
    const { rows } = await pool.query(
      `INSERT INTO public."appointments"(${fields}) VALUES(${OrderOfvalues}) RETURNING *`,
      values
    );
    res.json({
      success: true,
      msg: "appointments was created successfully.",
      data: rows,
    });
  } catch ({ message }) {
    res.json({ success: false, message });
  }
});
module.exports = appointmentsPost;
