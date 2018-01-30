const express = require('express');
const Database = require('./database');

const app = express();

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