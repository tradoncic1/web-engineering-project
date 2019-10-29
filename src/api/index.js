const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const mongojs = require('mongojs');
const db = mongojs("mongodb://admin:admin@cluster0-shard-00-00-kmxav.gcp.mongodb.net:27017,cluster0-shard-00-01-kmxav.gcp.mongodb.net:27017,cluster0-shard-00-02-kmxav.gcp.mongodb.net:27017/Trackr?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority");

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.use(express.static('public'));

app.get('/users', (req, res) => {
    db.users.find({}, (error, docs) => {
        console.log(docs);
        if (error) {
            throw error
        }
        res.json(docs);
    });
});

app.get('/users/:username', (req, res) => {
    db.users.find({ username: req.params.username }, (error, docs) => {
        console.log(req.params.username);
        if (error) {
            throw error
        }
        res.json(docs);
    });
});

app.post('/users', (req, res) => {
    db.users.insert(req.body, (error, docs) => {
        console.log(req.body);
        if (error) {
            throw error;
        }
        res.json(docs);
    });
})

app.listen(port, () => {
    console.log("Server listening on port: " + port);
});