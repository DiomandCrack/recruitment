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
            return res.json({ code: 1 });
        });
        /*
        user login
        method:POST
        endpoint:/user/login
        */
        Router.post('/login',(req,res,next)=>{
            const loginUser = _.get(req,'body');

            this.login(loginUser).then(
                (result)=>{       
                //delete pwd,_.unset doesn't work
                //_.unset(result,'pwd')
                //this way work....
                const {_id,user,email,type}=result;
                const resultUser = {_id,user,email,type};
                res.cookie('userid',result._id)
                return res.status(200).json(sucAuth(resultUser))
                }
            ).catch(
                (err)=>res.json(err)
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

            this.find(registerUser).then((result)=>{
                if(_.get(result,'length')!==0){
                    return res.json(errMsg('用户名或邮箱已被注册'))
                }

                this.create(registerUser).then(()=>{
                    return res.status(200).json(sucAuth());
                })
            }).catch(err=>{
                console.log('err',err)
                return res.json(err)
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

            this.findUserByEmail(user).then(
                (result)=>{
                    if(!result){
                        return reject(errMsg('邮箱或密码错误'))
                    }
                    const hashPassword = _.get(result, 'pwd');
                    const isMatch = bcrypt.compareSync(password, hashPassword);
                    if (!isMatch) {
                        return reject(errMsg('邮箱或密码错误'))
                    }
                    console.log(result)
                    return resolve(result)
                }
            ).catch(
                err=>reject(errMsg('服务器错误'))
            )
        })
    }
    create(user){
        return new Promise((resolve,reject)=>{
            //bcrypt encryption
            _.unset(user,'rpwd');
            const pwd =  _.get(user, 'pwd');
            const hashPwd = bcrypt.hashSync(pwd,saltRound);
            const userFormatted = {...user,pwd:hashPwd};

            this.userDb.create(userFormatted,(err,result)=>{
                return err?reject(err):resolve(result)
            })
        })
    }
    find(user){
        const errMsg = this.errorMessage
        return new Promise((resolve,reject)=>{
            const userName = _.get(user,'user');
            const email = _.get(user,'email')
            const query = {
                '$or':[
                    {user:userName},
                    {email}
                ]
            }
            this.userDb.find(query,(err,result)=>{
                return err?reject(errMsg('服务器错误')):resolve(result)
            })
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
    successAuth(data=null){
        return {code:0,data}
    }
}

module.exports = User;