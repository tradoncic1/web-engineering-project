const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

let config;
if (!process.env.HEROKU) {
    config = require('./config');
} else {
    config = process.env;
}

const jwt = require('jsonwebtoken');

const mongojs = require('mongojs');
const db = mongojs(config.MONGODB_URL);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));

app.use((req, res, next) => {
    console.log('Server time: ', Date.now());
    next();
});

let admin_router = express.Router();
require('./routes/admin.js')(admin_router, db, mongojs, jwt, config);
app.use('/admin', admin_router);

app.get('/login', (req, res) => {
    console.log("Login route");

    let jwtToken = jwt.sign({
        username: "kiradon",
        role: "user",
        type: "admin",
        exp: (Math.floor(Date.now() / 1000) + 3600), // token which lasts for an hour
    }, process.env.JWT_SECRET || config.JWT_SECRET);
    /* Output the JWT */
    res.json({ 'jwt' : jwtToken });
})

app.listen(port, () => {
    console.log("Server listening on port: " + port);
});