const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

const userRoute = require('./route/user/index.route.js');

// Connect mongoDb 
const Connection = require('./config/connectionDb');
Connection();

const path = require('path');
app.use('/public', express.static(path.join(__dirname, '../', 'public')));

// view engine
app.set('view engine', 'pug');
app.set('views', __dirname + `/views`);

// route
userRoute(app);

app.listen(port, () => {
    console.log(`=========== http://localhost/:${port} ===========`);
})