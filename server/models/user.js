const bcrypt = require('bcrypt');
const _ = require('lodash');
const express = require('express');
const {ObjectID} = require('mongodb');

const Router = express.Router();
const saltRound = 10;
const _filter={'pwd':0,'__v':0}
class User {
    constructor(app){
        this.app = app;
        this.setApi();
        this.User = app.db.getModel('user')
        this.Message = app.db.getModel('message')
    }
    setApi(){
        const app = this.app
        const errMsg = this.errorMessage;
        const sucAuth = this.successAuth;
        /*
        user list
        method:GET
        endpoint:/user/list
        */
        Router.get('/list',(req,res,next)=>{

            const {type} = _.get(req,'query','')

            this.find({type}).then((result)=>{
                return res.json(sucAuth(result))
            }).catch(err=>{console.log(err)})
        })
        /* 
        msg list
        method:GET
        endpoint：user/getmsglist
        */
        Router.get('/msglist',(req,res,next)=>{
            const userId = req.cookies.userId;
            this.find().then(
                result=>{
                    let users = {};
                    result.forEach(item=>{
                        users[item._id] = {name:item.user,avatar:item.avatar}
                    });
                    this.getMsgList(userId).then(doc=>{
                        // console.log(doc)
                        return res.json({code:0,msgs:doc,users:users})
                    }).catch(err=>console.log(err));
                }
            )
        })
        /*
        read message
        method:POST
        endpoint:/user/readmsg
        */
        Router.post('/readmsg',(req,res,next)=>{
            const {userId} = req.cookies
            const {from} = req.body
            console.log(from)
            this.updateMsg(from,userId)
                .then((result)=>{
                    console.log(result)
                    return res.json({code:0,num:result.nModified})
                })
                .catch((err)=>res.json(errMsg('修改失败')))
        })
        /*
        info update
        method:POST
        endpoint:/user/update
        */
        Router.post('/update',(req,res,next)=>{
            const {userId} = req.cookies;
            if(!userId){
                return res.json(errMsg(''));
            }
            const {body} = req;
            
            this.findUserByIdAndUpdate(userId,body).then(result=>{
                if(!result){
                    return res.json(errMsg());
                }
                console.log(result)
                return res.json(sucAuth(result));
            }).catch(err=>console.log(err))
        })
        /*
        user info
        method:GET
        endpoint:/user/info
        */

        Router.get('/info', (req, res, next) => {
            //validate cookie
            const {userId} = _.get(req,'cookies');

            this.findUserById(userId).then((result)=>{
                if(!result){
                    return res.json(errMsg('登陆失败'));
                }
                return res.json(sucAuth(result));
                
            }).catch(err=>res.json(errMsg('登陆失败')))
            
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
                const resultUser = this.copyUser(result)
                res.cookie('userId',result._id)
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

            this.findByEmailOrId(registerUser).then((result)=>{
                if(_.get(result,'length')!==0){
                    return res.json(errMsg('用户名或邮箱已被注册'))
                }

                this.create(registerUser).then((result)=>{
                    const resultUser = this.copyUser(result)
                    res.cookie('userId',result._id)
                    return res.status(200).json(sucAuth(resultUser));
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
        const email = _.get(user,'email','');
        const errMsg = this.errorMessage;
        return new Promise((resolve, reject) => {
            // if (!password || !email || !isEmail(email)) {
            //     return reject({ message: 'login error' })
            // }

            this.findUserByEmail(email).then(
                (result)=>{
                    if(!result){
                        return reject(errMsg('邮箱或密码错误'))
                    }
                    const hashPassword = _.get(result, 'pwd');
                    const isMatch = bcrypt.compareSync(password, hashPassword);
                    if (!isMatch) {
                        return reject(errMsg('邮箱或密码错误'))
                    }
                    // console.log(result)
                    return resolve(result)
                }
            ).catch(
                err=>reject(errMsg('服务器错误'))
            )
        })
    }
    create(user){
        const User = this.User;
        return new Promise((resolve,reject)=>{
            //bcrypt encryption
            _.unset(user,'rpwd');
            const pwd =  _.get(user, 'pwd');
            const hashPwd = bcrypt.hashSync(pwd,saltRound);
            const userFormatted = {...user,pwd:hashPwd};

            const userModel = new User(userFormatted);
            userModel.save((err,result)=>{
                return err?reject(err):resolve(result)
            })

            // User.create(userFormatted,(err,result)=>{
            //     return err?reject(err):resolve(result)
            // })
        })
    }
    find(user={}){
        const User = this.User
        return new Promise((resolve,reject)=>{
            User.find(user,(err,result)=>{
                return err?reject(err):resolve(result)
            })
        })
    }
    //find user by id or email
    findByEmailOrId(user){
        const errMsg = this.errorMessage
        const User = this.User
        return new Promise((resolve,reject)=>{
            const userName = _.get(user,'user');
            const email = _.get(user,'email')
            const query = {
                '$or':[
                    {user:userName},
                    {email}
                ]
            }
            User.find(query,(err,result)=>{
                return err?reject(errMsg('服务器错误')):resolve(result)
            })
        })
    }
    findUserByEmail(email){
        const User = this.User;
        return new Promise((resolve,reject)=>{
            User.findOne({email},(err,result)=>{
                return err?reject(err):resolve(result);
            })
        });
    }
    findUserById(id){
        const User = this.User;
        return new Promise((resolve,reject)=>{
            User.findOne({_id:new ObjectID(id)},_filter,(err,result)=>{
                return err?reject(err):resolve(result)
            });
        })
    }
    findUserByIdAndUpdate(id,data){
        const User = this.User;
        return new Promise((resolve,reject)=>{
            User.findByIdAndUpdate(id,data,(err,result)=>{
                const copyData = Object.assign({},{
                    user:result.user,
                    type:result.type
                },data)
                // console.log(copyData)
                return err?reject(err):resolve(copyData);
            })
        });

    }

    getMsgList(user){
        const Message = this.Message;
        return new Promise((resolve,reject)=>{
            Message.find({'$or':[{from:user},{to:user}]},(err,result)=>{
                return err?reject(err):resolve(result)
            })
        });
    }

    updateMsg(from,userId){
        const {Message} = this;
        return new Promise((resolve,reject)=>{
            // Message.find({from,to:userId},(err,result)=>{
            //     console.log(result)
            // })
            //'$set'只能设置第一个
            Message.update(
                {from,to:userId},
                {'$set':{read:true}},
                {'multi':true},
                (err,result)=>{
                return err?reject(err):resolve(result)
            })
        })
    }
    //clone
    copyUser(result){
        const {_id,user,email,type,avatar}=result;
        const resultUser = {_id,user,email,type,avatar};
        return resultUser
    }
    errorMessage(msg=''){
        return {code:1,msg}
    }
    successAuth(data=null){
        return {code:0,data}
    }
}

module.exports = User;