const express = require("express");
const pool = require("../../../../pool");
const usersPost = express.Router();
usersPost.post("/", async (req, res) => {
  try {
    //////////////////////////////////////////
    const { id, screens, ...newObj } = req.body;

    //////////////////////////////////
    //insert in main table (role)
    //fields Role
    const fieldsRole = Object.keys(newObj);

    //value Role
    const valuesRole = Object.values(newObj);

    //order value Role
    const OrderOfvaluesRole = [];
    for (let i = 0; i < valuesRole.length; ++i) {
      OrderOfvaluesRole.push(`$${i + 1}`);
    }

    const changed = [];
    let iupdate = 1;
    for (let prop in newObj) {
      changed.push(`${prop} = $${iupdate++}`);
    }

    //insert in db
    const resRole = !id
      ? await pool.query(
          `INSERT INTO public."role"(${fieldsRole}) VALUES(${OrderOfvaluesRole}) RETURNING *`,
          valuesRole
        )
      : await pool.query(
          `UPDATE public."role" SET ${changed.join(", ")} WHERE 1=1 AND id=$${
            changed.length + 1
          } RETURNING *`,
          [...Object.values(newObj), id]
        );

    ///////////////////////////////////
    //create body data for role screen route
    var bodyDataRoleScreen = [];
    if (resRole.rows[0].id) {
      for (let i = 0; i < screens.length; ++i) {
        const body = {
          role_id: resRole.rows[0].id,
          screen_id: screens[i],
        };
        bodyDataRoleScreen.push(body);
      }
    } else {
      for (let i = 0; i < screens.length; ++i) {
        const body = {
          role_id: id,
          screen_id: screens[i],
        };
        bodyDataRoleScreen.push(body);
      }
    }
    console.log(bodyDataRoleScreen);

    const data = bodyDataRoleScreen;

    //fields Role Screen
    const fieldsRoleScreen = Object.keys(data[0]).join(",");

    const orderValue = [];
    let i = 1;
    for (let x = 0; x < bodyDataRoleScreen.length; ++x) {
      var data1 = [];
      for (let prop in bodyDataRoleScreen[x]) {
        data1.push(`$${i++}`);
      }
      orderValue.push(`(${data1.map((y) => y).join(",")})`);
    }
    console.log("orderValue>>>>>>>>>>>>", orderValue.map((y) => y).join(","));

    //value Role Screen
    var valueRoleScreen = [];
    for (let i = 0; i < bodyDataRoleScreen.length; i++) {
      const itemValues = Object.values(bodyDataRoleScreen[i]);
      valueRoleScreen.push(...itemValues);
    }
    console.log("valueRoleScreen>>>>>>>>>>>>>>>>>>", valueRoleScreen);
    const {rows} = await pool.query(
      `INSERT INTO public."Role_Screens"(${fieldsRoleScreen}) VALUES${orderValue
        .map((y) => y)
        .join(",")} RETURNING *`,
      valueRoleScreen
    );

    res.json({
      success: true,
      data: rows,
      msg: "Role_Screens was created successfully.",
    });
    ///////////////////////////////////////
  } catch ({ message }) {
    res.json({ success: false, message });
  }
});
module.exports = usersPost;
//roleScreensReq
