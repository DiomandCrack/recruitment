const express = require('express');
const Database = require('./database');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

const database = new Database();
database.connect();

app.get('/', (req, res) => {
    res.send('Hello world');
});

database.createUser({
    user: 'xiaohua',
    age: 12,
}).then((user) => { console.log(user) }).catch(err => console.log(err));

app.get('/data', (req, res, next) => {
    database.findUser({}).then(
        (users) => {
            res.json(users)
        }
    ).catch(
        (err) => {
            console.log(err);
        }
    );

});

app.listen(3001, () => {
    console.log('app start at port 3001');
});