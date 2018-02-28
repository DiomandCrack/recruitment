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
    unread:0
}

export function chat(state=initState,action){
    switch(action.type){
        case MSG_LIST:
            return {...state,chatMsg:action.payload,unread:action.payload.filter(item=>!item.read).length}
        case MSG_RECE:
            return {...state,chatMsg:[...state.chatMsg,action.payload]}
        case MSG_READ:
        default:
            return state
    }
}

const msgList=(msgs)=>{
    return {type:MSG_LIST,payload:msgs}
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
    return dispatch => {
        service.get('user/msglist').then(res=>{
            if(res.state===200&&res.data.code===0){
                dispatch(msgList(res.data.msgs))
            }
        })
    }
}
