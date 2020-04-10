const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public')); // use public for default search for static files. (img, css, js, ...);

app.get('/', (req, res) => {
    res.send(`Hello world !!!`);
});

app.get('/about', (req, res) => {
    res.send(`About us !!`);
});

// app.get('/introduction', (req, res) => {
//     res.sendFile(path.resolve(__dirname, './index.html'));
// });

// app.get('/konasuba.jpg', (req, res) => {
//     res.send(path.resolve(__dirname, './konosuba.jpg'));
// });

// resolve this dump situation by using "static file in express". express.static()

app.listen(3000);