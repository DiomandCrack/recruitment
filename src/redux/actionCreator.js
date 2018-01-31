const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MESSAGE = 'ERROR_MESSAGE'

//user
export const errorMsg=(msg)=>{
    return {msg,type:ERROR_MSG}
}