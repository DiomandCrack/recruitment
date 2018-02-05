import _ from 'lodash'

import Service from '../../utils/service';
import {getRedirectPath} from '../../utils/redirect'

const service = new Service();
const initState = {
    redirectTo:'',
    isAuth:false,
    msg:'',
    user:'',
    email:'',
    pwd:'',
    type:'',
}

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MESSAGE = 'ERROR_MESSAGE'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOAD_DATA = 'LOAD_DATA'

//user actionCreator

const errMsg=(msg)=>{

    return {payload:msg,type:ERROR_MESSAGE}

}

const registerSuccess = (user)=>{

   return {payload:user,type:REGISTER_SUCCESS}

}

const loginSuccess = (user) => {

    return {payload:user,type:LOGIN_SUCCESS}

}

const loadData = (user) => {
    return {payload:user,type:LOAD_DATA}
}
//reducer
export const user=(state=initState,action) => {

   switch(action.type){
    case REGISTER_SUCCESS:
        return {...state,...action.payload,isAuth:true,msg:'注册成功',redirectTo:getRedirectPath(_.get(action,'payload'))}
    case ERROR_MESSAGE:
        return {isAuth:false,msg:action.payload} 
    case LOGIN_SUCCESS:
        return {...state,...action.payload,isAuth:true,msg:'登陆成功',redirectTo:getRedirectPath(_.get(action,'payload'))}
    case LOAD_DATA:
        return {...state,...action.payload}
    default:
        return state
   }

}

export const loadUser=()=>{
    //get user info
    return (dispatch)=>{
        service.get('user/info').then(res => {

            if (_.get(res,'status') === 200) {
                if(_.get(res.data,'code')===0){
                    //user login
                    dispatch(loadData(res.data.data));
                }else{
                    this.props.history.push('/login');
                    dispatch(errMsg(res.data.msg))
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
                    dispatch(loginSuccess(res.data.data))
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
                    dispatch(registerSuccess(userObj))
                }else{
                    dispatch(errMsg(res.data.msg))
                }
            }
        ).catch((err)=>console.log(err));

    }
}
