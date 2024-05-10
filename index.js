// //////////////////////////////////////////////////////////////////
const PORT = 1998;
const express = require("express");
const app = express();
const cors = require("cors");
const usersReq = require("./src/Modules/public/Users/index");
const billReq = require("./src/Modules/public/Bills/indexBill");
const roleReq = require("./src/Modules/public/role/index");
const roleScreensReq = require("./src/Modules/public/Role Screens/index");
const screensReq = require("./src/Modules/public/Screens/index");
const logInReq = require("./src/Modules/public/login/index");
const hallsReq = require("./src/Modules/public/halls/index");
app.use(express.json());
app.use(cors());

//bills
app.use("/bills", billReq.postData);
app.use("/bills", billReq.readData);
app.use("/bills", billReq.updateData);
app.use("/bills", billReq.deleteData);
app.use("/billsBulk", billReq.bulkPostData);

//user
app.use("/user", usersReq.postData);
app.use("/user", usersReq.readData);
app.use("/user", usersReq.updateData);
app.use("/user", usersReq.deleteData);

//role
app.use("/role", roleReq.postData);
app.use("/role", roleReq.readData);
app.use("/role", roleReq.updateData);
app.use("/role", roleReq.deleteData);

//role_screens
app.use("/role_screens", roleScreensReq.postData);
app.use("/role_screens", roleScreensReq.readData);
// app.use("/role", roleReq.updateData);
app.use("/role_screens", roleScreensReq.deleteData);

//screens
// app.use("/role", roleReq.postData);
app.use("/screens", screensReq.readData);
// app.use("/role", roleReq.updateData);
// app.use("/role", roleReq.deleteData);

//halls
app.use("/halls", hallsReq.postData);
app.use("/halls", hallsReq.readData);
app.use("/halls", hallsReq.updateData);
app.use("/halls", hallsReq.deleteData);

//login
app.use("/login", logInReq.postData);

// Allow requests from all origins
app.listen(PORT, () => {
  console.log(`listening for requests on port ${PORT}`);
});
