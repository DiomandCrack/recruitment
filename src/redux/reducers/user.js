import _ from 'lodash'

import Service from '../../utils/service';
import {getRedirectPath} from '../../utils/redirect'

const service = new Service();
const initState = {
    redirectTo:'',
    msg:'',
    user:'',
    email:'',
    pwd:'',
    type:'',
}

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MESSAGE = 'ERROR_MESSAGE'
const LOAD_DATA = 'LOAD_DATA'

//user actionCreator

const errMsg=(msg=null)=>{

    return {payload:msg,type:ERROR_MESSAGE}

}

const authSuccess = (user)=>{

   return {payload:user,type:AUTH_SUCCESS}

}

const loadData = (user) => {
    return {payload:user,type:LOAD_DATA}
}
//reducer
export const user=(state=initState,action) => {

   switch(action.type){
    case AUTH_SUCCESS:
        return {...state,...action.payload,redirectTo:getRedirectPath(_.get(action,'payload'))}
    case ERROR_MESSAGE:
        return {...state,msg:action.payload,isAuth:false} 
    case LOAD_DATA:
        return {...state,...action.payload,isAuth:true,msg:''}
    default:
        return state
   }

}
export const update = (data)=>{
    return (dispatch)=>{
        service.post('user/update',data).then(res=>{
            if (_.get(res,'status') === 200) {
                if(_.get(res.data,'code')===0){
                    dispatch(authSuccess(res.data.data));
                }else{
                    dispatch(errMsg('登陆失败'))
                }
            }
        })
    }
}

export const loadUser=(cb=()=>{})=>{
    //get user info
    return (dispatch)=>{
        service.get('user/info').then(res => {

            //get user info
            //login or not
            //user identity ? boss : seeker
            //finish user info
            if (_.get(res,'status') === 200) {
                if(_.get(res.data,'code')===0){
                    //user login
                    dispatch(loadData(res.data.data));
                }else{
                    cb()
                    dispatch(errMsg('登陆失败'))
                }
            }

        }).catch(err=>console.log(err))

    }
}

export const login = (userObj)=>{

    if(!_.get(userObj,'email')||!_.get(userObj,'pwd')){
        return errMsg('邮箱或密码不能为空')
    }
    return dispatch => {
        service.post('user/login',userObj).then(
            res=>{
                if(res.status ===200&&res.data.code===0){
                    //code status code
                    //msg error message
                    //data details data
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errMsg(res.data.msg))
                }
            }
        ).catch((err)=>console.log(err));

    }
    
}
//async action creator
export const register = (userObj)=>{

    if(!_.trim(_.get(userObj,'user'))){
        return errMsg('用户名不能为空');
    }
    if(!_.trim(_.get(userObj,'email'))){
        return errMsg('邮箱不能为空');
    }
    if(!_.trim(_.get(userObj,'pwd'))){
        return errMsg('密码不能为空');
    }
    if(_.get(userObj,'pwd')!==_.get(userObj,'rpwd')){
        return errMsg('密码和确认密码必须相同');
    }
    return (dispatch) => {

        service.post(`user/register`,userObj).then(
            res=>{
                if(res.status ===200&&res.data.code===0){
                    dispatch(authSuccess(userObj))
                }else{
                    dispatch(errMsg(res.data.msg))
                }
            }
        ).catch((err)=>console.log(err));

    }
}

