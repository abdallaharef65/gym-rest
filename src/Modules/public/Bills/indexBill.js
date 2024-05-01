// const getData = require("./Read/index");
// const postData = require("./Create/index");
// const upDateData = require("./Update/index");
// const deleteData = require("./Delete/index");
// const postBulkData = require("./Create/bulkbills");

// //("/Bills", app, pool)
// const ReadDataBill = (route, app, pool) => {
//   getData(route, app, pool);
//   postData(route, app, pool);
//   upDateData(route, app, pool);
//   deleteData(route, app, pool);
//   postBulkData(route, app, pool);
// };

// module.exports = router;

///

const postData = require("./Create/index");
const bulkPostData = require("./Create/bulkbills");
const readData = require("./Read/index");
const updateData = require("./Update/index");
const deleteData = require("./Delete/index");

module.exports = {
  postData,
  readData,
  updateData,
  deleteData,
  bulkPostData,
};
