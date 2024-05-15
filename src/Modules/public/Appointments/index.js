const postData = require("./Create/index");
const appointmentsBulkPost = require("./Create/bulkbills");
const readData = require("./Read/index");
const updateData = require("./Update/index");
const deleteData = require("./Delete/index");

module.exports = {
  postData,
  readData,
  updateData,
  deleteData,
  appointmentsBulkPost,
};
