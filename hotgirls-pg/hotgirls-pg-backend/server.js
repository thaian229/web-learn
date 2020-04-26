const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const mountRoutes = require('./routes')

const app = express()
mountRoutes(app)

app.listen(3001)