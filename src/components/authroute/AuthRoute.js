import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import _ from 'lodash'

import {loadUser} from '../../redux/reducers/user'

@withRouter
@connect(
    null,
    {loadUser}
)
class AuthRoute extends Component {
    componentDidMount() {
        //get user info
        //login or not
        //user identity ? boss : seeker
        //finish user info
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname
        if(_.indexOf(publicList,pathname)!==-1){
            return null
        }
        console.log(this.props.loadData)
        this.props.loadUser();
    }
    render(){
        return(

            <p>判断跳转的地方</p>
        )
    }
}

export default AuthRoute