const { Client } = require('pg');

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "test",
    password: "22114455",
    port: 5432,
});

const execute = async () => {
    try {
        await client.connect()
        console.log("Connected")
        const results = await client.query(`SELECT * FROM employees`)
        console.table(results.rows)
    } catch (err) {
        console.log(err)
    } finally {
        await client.end()
        console.log("Disconnected")
    }
}

execute()