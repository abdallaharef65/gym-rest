const pg = require("pg");
pg.types.setTypeParser(1082, (stringValue) => stringValue); //1082 for date type
pg.types.setTypeParser(1114, (stringValue) => stringValue); //1114 for time without timezone type

module.exports = new pg.Pool({
  user: "postgres",
  host: "localhost",
  database: "Gym",
  password: "Aref@1998",
  port: 5432, // Default PostgreSQL port
});
