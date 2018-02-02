const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');

const Router = express.Router();


class User {
    constructor(app){
        this.app = app;
        this.setApi();
    }
    setApi(){
        const app = this.app
        const User = app.db.getModel('user')
        /*
        user list
        method:GET
        endpoint:/user/list
        */
        Router.get('/list',(req,res,next)=>{
            User.find({},(err,list)=>{
                return res.json(list)
            })
        })

        /*
        user info
        method:GET
        endpoint:/user/info
        */

        Router.get('/info', (req, res, next) => {
            //validate cookie

            return res.json({ code: 0 });
        });

        /*
        user resgister
        method:POST
        endpoint:/user/register
        */
        Router.post('/register',(req,res,next)=>{
            console.log('register user',req.body)
            const registerUser = req.body;
            User.find({$or:[{user:_.get(registerUser,'user')},{email:_.get(registerUser,'email')}]},(err,result)=>{
                console.log(result)
                if(_.get(result,'length')!==0){
                    return res.json({code:1,msg:'用户名重复'})
                }
                User.create(registerUser,(err,data)=>{
                    if(err){
                        return res.json({code:1,msg:'服务器出错了'})
                    }
                    return res.json({code:0})
                })
            })
        })

        app.use('/user', Router)
    }
}

module.exports = User;