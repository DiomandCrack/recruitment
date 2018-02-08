import _ from 'lodash'
export const getRedirectPath=(user)=>{
    //根据用户信息 返回跳转地址
    //user.type /boss /seeker
    //user.avatar /bossinfo /seekinfo
    let url = (_.get(user,'type')==='boss')?'/boss':'/seeker'
    if(!_.get(user,'avatar',null)){
        url += 'info'
    }
    return url
}