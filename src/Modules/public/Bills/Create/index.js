const express = require("express");
const pool = require("../../../../pool");
const billsPost = express.Router();
billsPost.post("/", async (req, res) => {
  try {
    // console.log("post132");
    console.log("routerBills><>>>>>>>>>>>>>>>>>>>>>", routerBills);
    const fields = Object.keys(req.body);
    const values = Object.values(req.body);
    const OrderOfvalues = [];
    for (let i = 0; i < values.length; ++i) {
      OrderOfvalues.push(`$${i + 1}`);
    }
    //INSERT INTO public."Bills"(bill_number,date,bill_amount,bill_discount,notes,appointment_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *
    const { rows } = await pool.query(
      `INSERT INTO public."Bills"(${fields}) VALUES(${OrderOfvalues}) RETURNING *`,
      values
    );
    res.json({
      success: true,
      msg: "Bill was created successfully.",
      data: rows,
    });
  } catch ({ message }) {
    res.json({ success: false, message });
  }
});
module.exports = billsPost;
