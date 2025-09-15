const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT;

// Connect mongoDb 
const Connection = require('./config/connectionDb');
Connection();

app.get('/', async (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`=========== http://localhost/:${port} ===========`);
})