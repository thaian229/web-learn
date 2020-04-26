const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    password: '22114455',
    host: 'localhost',
    port: 5432,
    database: 'test',
})

const execute = async () => {
    try {
        await client.connect()
        console.log("Connected")
        await client.query('BEGIN')
        await client.query('INSERT INTO employees VALUES ($1, $2)', [6, 'John Cena'])
        console.log("Inserted a row")
        await client.query("COMMIT")
    } catch (err) {
        console.log(err)
        await client.query("ROLLBACK")
    } finally {
        await client.end()
        console.log("Disconnect")
    }
}

execute()