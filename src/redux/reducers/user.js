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
        console.log(action.payload)
        console.log({...state,...action.payload,isAuth:true,msg:'注册成功'})
        return {...state,...action.payload,isAuth:true,msg:'注册成功'}
    case ERROR_MESSAGE:
        return {isAuth:false,msg:action.payload} 
    default:
        return state
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
    return dispatch => {
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