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


//admin router setup
let admin_router = express.Router();
require('./routes/admin.js')(admin_router, db, mongojs, jwt, config);
app.use('/admin', admin_router);

//tickets router setup
let tickets_router = express.Router();
require('./routes/tickets')(tickets_router, db, mongojs, jwt, config);
app.use('./tickets', tickets_router);

//users router setup
let users_router = express.Router();
require('./routes/users')(users_router, db, mongojs, jwt, config);
app.use('./users', users_router);

//login call
app.get('/login', async (req, res) => {
    console.log("Login route");

    try {
        let jwtToken;
        await db.users.findOne({ username: req.body.username, password: req.body.password }, (err, doc) => {
            if (!doc) {
                return res.status(404).send("Login failed! Wrong credentials");
            }
            jwtToken = jwt.sign({
                username: doc.username,
                role: doc.role,
                exp: (Math.floor(Date.now() / 1000) + 3600), // token which lasts for an hour
            }, process.env.JWT_SECRET || config.JWT_SECRET);

            res.send({ 'user': doc, 'jwt': jwtToken });
        });
    } catch (error) {
        res.status(400).send(error)
    }
});

//register call
app.post('/register', async (req, res) => {
    console.log("Login route");

    try {
        let user;
        await db.users.findOne({ username: req.body.username }, async (err, docs) => {
            if (docs != null) {
                return res.status(400).send("Register failed! User already exists");
            }

            await db.users.insert({
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstName,
                role: 4,
                lastName: req.body.lastName
            })
        });
    } catch (error) {
        res.status(400).send(error)
    }
});

app.listen(port, () => {
    console.log("Server listening on port: " + port);
});