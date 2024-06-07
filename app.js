// //////////////////////////////////////////////////////////////////
const PORT = 1998;
const express = require("express");
const app = express();
const cors = require("cors");
const usersReq = require("./src/Modules/public/Users/index");
const roleReq = require("./src/Modules/public/role/index");
const roleScreensReq = require("./src/Modules/public/Role Screens/index");
const screensReq = require("./src/Modules/public/Screens/index");
const logInReq = require("./src/Modules/public/login/index");
const hallsReq = require("./src/Modules/public/halls/index");
const coursesReq = require("./src/Modules/public/courses/index");
const appointmentsReq = require("./src/Modules/public/Appointments/index");
app.use(express.json());
app.use(cors());

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

//appointments
app.use("/appointments", appointmentsReq.readData);
app.use("/appointments", appointmentsReq.postData);
app.use("/appointmentsbulk", appointmentsReq.appointmentsBulkPost);
app.use("/appointments", appointmentsReq.updateData);
app.use("/appointments", appointmentsReq.deleteData);

// courses
app.use("/courses", coursesReq.postData);
app.use("/courses", coursesReq.readData);
app.use("/courses", coursesReq.updateData);
app.use("/courses", coursesReq.deleteData);

//login
app.use("/login", logInReq.postData);

// Allow requests from all origins
app.listen(PORT, () => {
  console.log(`listening for requests on port ${PORT}`);
});
