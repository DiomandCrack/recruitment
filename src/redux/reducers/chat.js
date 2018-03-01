import Service from '../../utils/service'
import Realtime from '../../utils/realtime'

const service = new Service()
const realtime = new Realtime()

//获取列表信息
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECE = 'MSG_RECE'
//标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatMsg:[],
    users:{},
    unread:0
}

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,chatMsg:action.payload.msgs,unread:action.payload.msgs.filter(item=>!item.read&&item.to===action.payload.userId).length,users:action.payload.users}
        case MSG_RECE:
            return {...state,chatMsg:[...state.chatMsg,action.payload],unread:state.unread+1}
        case MSG_READ:
        default:
            return state
    }
}

const msgList=(msgs=[],users,userId)=>{
    return {type:MSG_LIST,payload:{msgs,users,userId}}
}

const msgRecv=(msg)=>{
    return {type:MSG_RECE,payload:msg}
}

export function receMsg(){
    return dispatch=>{
        realtime.receMsg((data)=>{
            console.log('receMsg',data);
            dispatch(msgRecv(data));
        })
    }
}

export function sendMsg({from,to,msg}){
    return dispatch => {
        realtime.sendMsg({from,to,msg})
    }
}
export function getMsgList(){
    return (dispatch,getState) => {

        service.get('user/msglist').then(res=>{
            if(res.status===200&&res.data.code===0){
                console.log(getState())
                const userId = getState().user._id;
                dispatch(msgList(res.data.msgs,res.data.users,userId))
            }
        })
    }
}
