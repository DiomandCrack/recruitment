const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');

const Router = express.Router();
const saltRound = 10;

class User {
    constructor(app){
        this.app = app;
        this.setApi();
    }
    setApi(){
        const app = this.app
        const User = app.db.getModel('user')
        const errMsg = this.errorMessage;
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
        user login
        method:POST
        endpoint:/user/login
        */
        Router.post('/login',(req,res,next)=>{
            const loginUser = req.body;
            const email = _.get(loginUser,'email');
            const pwd = _.get(loginUser,'pwd');
            User.findOne({email},(err,result)=>{
                if(err){
                    return res.json(errMsg('登陆失败'));
                }
                if(!result){
                    return res.json(errMsg('邮箱或密码错误'))
                }
                //match password
                const hashPassword = _.get(result,'pwd');
                const isMatch = bcrypt.compareSync(pwd,hashPassword);
                if(!isMatch){
                    return res.json(errMsg('邮箱或密码错误'))
                }
                //delete password from mongoDB
                _.unset(result, 'pwd');
                console.log(result);
                return res.json({code:0,data:result})
            });
        });
        /*
        user resgister
        method:POST
        endpoint:/user/register
        */
        Router.post('/register',(req,res,next)=>{
            console.log('register user',req.body)
            const registerUser = req.body;
            //bcrypt encryption
            _.unset(registerUser,'rpwd');
            const pwd =  _.get(registerUser, 'pwd');
            const hashPwd = bcrypt.hashSync(pwd,saltRound);
            const userFormatted = {...registerUser,pwd:hashPwd};
 
            User.find({$or:[{user:_.get(registerUser,'user')},{email:_.get(registerUser,'email')}]},(err,result)=>{
                console.log(result)
                if(_.get(result,'length')!==0){
                    return res.json(errMsg('用户名或邮箱已被注册'))
                }
                User.create(userFormatted,(err,data)=>{
                    if(err){
                        return res.json(errMsg('服务器错误'))
                    }
                    return res.json({code:0})
                })
            })
        })

        app.use('/user', Router)
    }
    errorMessage(msg){
        return {code:1,msg}
    }
}

module.exports = User;