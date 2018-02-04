const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');

const Router = express.Router();
const saltRound = 10;

class User {
    constructor(app){
        this.app = app;
        this.setApi();
        this.userDb = app.db.getModel('user')
    }
    setApi(){
        const app = this.app
        const userDb = this.userDb
        const errMsg = this.errorMessage;
        const sucAuth = this.successAuth;
        /*
        user list
        method:GET
        endpoint:/user/list
        */
        Router.get('/list',(req,res,next)=>{
            userDb.find({},(err,list)=>{
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
            const loginUser = _.get(req,'body');
            // const email = _.get(loginUser,'email');
            // const pwd = _.get(loginUser,'pwd');
            // User.findOne({email},(err,result)=>{
            //     if(err){
            //         return res.json(errMsg('登陆失败'));
            //     }
            //     if(!result){
            //         return res.json(errMsg('邮箱或密码错误'))
            //     }
            //     //match password
            //     const hashPassword = _.get(result,'pwd');
            //     const isMatch = bcrypt.compareSync(pwd,hashPassword);
            //     if(!isMatch){
            //         return res.json(errMsg('邮箱或密码错误'))
            //     }
            //     //delete password from mongoDB
            //     _.unset(result, 'pwd');
            //     console.log(result);
            //     return res.json({code:0,data:result})
            // });
            // this.findUserByEmail(loginUser).then(
            //     (result)=>{
            //         //match password
            //         if(!result){
            //             return res.json(errMsg('邮箱或密码错误'))
            //         }
            //         const pwd = _.get(loginUser,'pwd');
            //         const hashPassword = _.get(result,'pwd');
            //         const isMatch = bcrypt.compareSync(pwd,hashPassword);
            //         _.unset(result, 'pwd');
            //         if(!isMatch){
            //             return res.json(errMsg('邮箱或密码错误'))
            //         }
            //         //delete password from mongoDB
                   
            //         return res.json({code:0,data:result})
            //     }
            // ).catch((err)=>{
            //     console.log(err)
            //     res.json(errMsg('登陆失败'))
            // })
            this.login(loginUser).then(
                (result)=>{       
                    
                //delete pwd,_.unset doesn't work
                //_.unset(email,'pwd')
                //this way work....
                const {_id,user,email,type}=result;
                const resultUser = {_id,user,email,type};
                return res.status(200).json(sucAuth(resultUser))
                }
            ).catch(
                (err)=>err
            )
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
 
            userDb.find({$or:[{user:_.get(registerUser,'user')},{email:_.get(registerUser,'email')}]},(err,result)=>{
                console.log(result)
                if(_.get(result,'length')!==0){
                    return res.json(errMsg('用户名或邮箱已被注册'))
                }
                userDb.create(userFormatted,(err,data)=>{
                    if(err){
                        return res.json(errMsg('服务器错误'))
                    }
                    return res.json({code:0})
                })
            })
        })

        app.use('/user', Router)
    }

    login(user){
        const password = _.get(user, 'pwd', '');
        const errMsg = this.errorMessage;
        return new Promise((resolve, reject) => {
            // if (!password || !email || !isEmail(email)) {
            //     return reject({ message: 'login error' })
            // }

            //find in database with email
            // this.findUserByEmail(email, (err, result) => {
            //     if (err) {
            //         return reject(err);
            //     }
            //     const hashPassword = _.get(result, 'password');
            //     const isMatch = bcrypt.compareSync(password, hashPassword);
            //     // return isMatch ? resolve(result) : reject({ message: 'login error' })
            //     if (!isMatch) {
            //         return reject({ message: 'login error' })
            //     }
            //     //user login successfully creat new token to token collection.
            //     const userId = _.get(result, '_id')
            //     this.app.models.token.create(userId).then((token) => {
            //         token.user = result
            //         return resolve(token);
            //     }).catch(() => {
            //         return reject({ message: 'login error' })
            //     })
            // })
            this.findUserByEmail(user).then(
                (result)=>{
                    if(!result){
                        return reject(errMsg('用户名或密码错误'))
                    }
                    const hashPassword = _.get(result, 'pwd');
                    const isMatch = bcrypt.compareSync(password, hashPassword);
                    if (!isMatch) {
                        return reject(errMsg('用户名或密码错误'))
                    }
                    console.log(result)
                    return resolve(result)
                }
            ).catch(
                err=>reject(errMsg('服务器错误'))
            )
        })
    }
    findUserByEmail(user){
        const userDb = this.userDb;
        const email = _.get(user,'email','');
        return new Promise((resolve,reject)=>{
            userDb.findOne({email},(err,result)=>{
                return err?reject(err):resolve(result);
            })
        });
    }
    errorMessage(msg){
        return {code:1,msg}
    }
    successAuth(data){
        return {code:0,data}
    }
}

module.exports = User;