require('dotenv').config();

const pg = require("pg");



module.exports = new pg.Pool({
  connectionString:  process.env.BASE_URL,
  ssl:false, 

});

