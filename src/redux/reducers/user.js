import Service from '../../utils/service';
import _ from 'lodash'
const service = new Service();
const initState = {
    isAuth:false,
    msg:'',
    user:'',
    email:'',
    pwd:'',
    type:'',
}
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MESSAGE = 'ERROR_MESSAGE'


//user actionCreator
const errMsg=(msg)=>{
    return {payload:msg,type:ERROR_MESSAGE}
}

const registerSuccess = (data)=>{
   return {payload:data,type:REGISTER_SUCCESS}
}
//
export const user=(state=initState,action) => {
   switch(action.type){
    case REGISTER_SUCCESS:
        return {...state,isAuth:true,msg:'注册成功',...action.payload}
    case ERROR_MESSAGE:
        return {...state,isAuth:false,msg:action.payload} 
    default:
        return state
   }
}


//async action creator
export const register = (user,email,pwd,rpwd,type)=>{
    if(!_.trim(user)){
        return errMsg('用户名不能为空');
    }
    if(!_.trim(email)){
        return errMsg('邮箱不能为空');
    }
    if(!_.trim(pwd)){
        return errMsg('密码不能为空');
    }
    if(pwd!==rpwd){
        return errMsg('密码和确认密码必须相同');
    }
    const registerUser = {
        user,
        email,
        pwd,
        type,
    }
    return dispatch => {
        service.post('user/register',registerUser).then(
            res=>{
                res.status ===200&&res.data.code===0?dispatch(registerSuccess(registerUser)):dispatch(errMsg(res.data.msg))
            }
        );

    }
}