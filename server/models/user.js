const express = require('express');
const Router = express.Router();

class User {
    constructor(app){
        this.app = app;
        this.setApi();
    }
    setApi(){
        const app = this.app
        /*
        user info
        method:GET
        endpoint:/user/info
        */
        Router.get('/info', (req, res, next) => {
            //validate cookie
            return res.json({ code: 0 });
        });

        app.use('/user', Router)
    }
}

module.exports = User;