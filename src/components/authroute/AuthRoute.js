import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import _ from 'lodash'

import {loadUser} from '../../redux/reducers/user'

@withRouter
@connect(
    state=>state.user,
    {loadUser}
)
class AuthRoute extends Component {
    componentDidMount(){
        const publicList = ['/login','/register']
        const pathname = _.get(this,'props.location.pathname')
        if(_.indexOf(publicList,pathname)!==-1){
            return null
        }
        const props = _.get(this,'props')
        props.loadUser(()=>{
            const history = _.get(props,'history')
            history.push('login')
        })
    }

    render(){
        return (<div></div>)
    }
}

export default AuthRoute