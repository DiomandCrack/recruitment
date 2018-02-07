import Service from '../../utils/service'
const service = new Service();

const USER_LIST = 'USER_LIST'

const initState = {
    userList:[],

}

const userList = (data)=>{
    return {type:USER_LIST,payload:data}
}

export const chatToUser = (state=initState,action) => {
    switch(action.type){
        case USER_LIST:
            return{...state,userList:action.payload}
        default:
            return state
    }
}

export const getUserList=(type)=>{
    return dispatch=>{
        service.get(`user/list?type=${type}`).then(res=>{
            if(res.data.code===0){
                dispatch(userList(res.data.data))
            }
        }).catch(err=>console.log(err));
    }
}

