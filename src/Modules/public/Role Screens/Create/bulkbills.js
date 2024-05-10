
const express = require("express");
const pool = require("../../../../pool");
const billsBulkPost = express.Router();

billsBulkPost.post("/", async (req, res) => {
  try {
    const data = req.body;
    const fields = Object.keys(data[0]);
    const placeholders = [];
    let i = 1;
    for (let x = 0; x < data.length; ++x) {
      var data1 = [];
      for (let prop in data[x]) {
        data1.push(`$${i++}`);
      }
      placeholders.push(data1);
    }

    const valuesClause = placeholders
      .map((arritem) => `(${arritem.join(",")})`)
      .join(",");

    const query = `INSERT INTO public."Bills"(${fields.join(
      ","
    )}) VALUES ${valuesClause} RETURNING *`;
    //INSERT INTO public."Bills"(bill_number,date,bill_amount,bill_discount,notes,appointment_id) VALUES ($1,$2,$3,$4,$5,$6),($7,$8,$9,$10,$11,$12) RETURNING *
    console.log(query);
    console.log(fields);
    const values = [];
    for (let i = 0; i < data.length; i++) {
      const itemValues = Object.values(data[i]);

      values.push(...itemValues);
    }
    const { rows } = await pool.query(query, values);

    // Sending response with inserted data
    res.json({
      success: true,
      msg: "Bills were created successfully.",
      data: rows,
    });
  } catch ({ message }) {
    // Handling errors
    res.json({ success: false, message });
  }
});

module.exports = billsBulkPost;
