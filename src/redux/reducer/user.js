import {errMsg} from '../actionCreator';
import Service from '../../utils/service';

const service = new Service();

export const user=(state,action)=>{
    //']
}


export const register = (user,email,pwd,rpwd,type)=>{
    if(!user){
        return errMsg('用户名不能为空');
    }
    if(!email){
        return errMsg('邮箱不能为空');
    }
    if(!pwd){
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
                res.status ===200&&res.data.code===0?dispatch(REGISTER_SUCCESS):dispatch(errMsg)
            }
        );

    }
}