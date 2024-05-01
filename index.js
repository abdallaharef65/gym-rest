// //////////////////////////////////////////////////////////////////
const express = require("express");
const app = express();
const cors = require("cors");
const usersReq = require("./src/Modules/public/Users/index");
const billReq = require("./src/Modules/public/Bills/indexBill");
// console.log(postData);
app.use(express.json());
app.use(cors());

app.use("/bills", billReq.postData);
app.use("/bills", billReq.readData);
app.use("/bills", billReq.updateData);
app.use("/bills", billReq.deleteData);
app.use("/billsBulk", billReq.bulkPostData);

app.use("/user", usersReq.postData);
app.use("/user", usersReq.readData);
app.use("/user", usersReq.updateData);
app.use("/user", usersReq.deleteData);

// Allow requests from all origins
app.listen(3001, () => {
  console.log("listening for requests on port 3000");
});
