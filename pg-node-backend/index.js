const { Pool, Client } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "22114455",
    port: 5432,
});

pool
    .query('SELECT * FROM employees')
    .then((res) => console.table(res.rows))
    .catch((err) => console.log(err))
    .finally(() => pool.end())