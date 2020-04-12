const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public')); // set public as static folder

// Define routers:

app.get('/', (req, res) => {    // sendFile must use absolute path
    res.sendFile(path.resolve(__dirname, './public/html/index.html'));
});

app.get('/ask', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/html/ask.html'));
});

// Make listen to port 3000:

app.listen(3000);