const pg = require('pg');

const pool = new pg.Pool({
  database: `react_gallery`,
  host: `localhost`,
  max: 10,
  port: 5432,
  idleTimeoutMillis: 30000,
});

pool.on(`connect`, () => {
  console.log('PostgreSQL connected');
});

pool.on(`error`, (err) => {
  console.log(
    `There was an error with the pool connecting to PostgreSQL:`,
    err
  );
});

module.exports = pool;
