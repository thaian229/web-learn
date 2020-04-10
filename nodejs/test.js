const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'testdb',
    password: '22114455',
    port: 5432,
});

client.connect()
.then(() => console.log("Connected successfully"))
.catch(e => console.log)
.finally(() => client.end());