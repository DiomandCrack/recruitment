import { combineReducers } from 'redux'

//state.user
import {user} from './reducers/user'
import {chatToUser} from './reducers/chat'

export default combineReducers({user,chatToUser})