require('dotenv').config();

const pg = require("pg");


console.log('Database URL:', process.env.BASE_URL); // retren undifaind
console.log('Database URL:', process.env.BASE_URL); // retren undifaind

module.exports = new pg.Pool({
  connectionString:  process.env.BASE_URL,
  ssl:false, 

});

