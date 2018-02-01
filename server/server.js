const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const Model = require('./models');
const userRouter = require('./userRouter')
const AppRouter = require('./app-router');
const Database = require('./database');

const app = express();

app.use(cors({
    exposedHeaders: "*"
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

app.db = new Database();
app.db.connect();

app.models = new Model(app);

app.listen(3001, () => {
    console.log('app start at port 3001');
});