const express = require('express');
const app = express();

require('dotenv').config();

const port = process.env.PORT || 3000;

const userRoute = require('./route/user/index.route.js');
const adminRote = require('./route/admin/index.route.js');

// methed
const methodOverride = require('method-override');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded())
app.use(methodOverride('_method'));

// flash 
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('ngvaergeralng'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

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
adminRote(app);

app.listen(port, () => {
    console.log(`=========== http://localhost/:${port} ===========`);
})