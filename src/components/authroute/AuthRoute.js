import React, { Component } from 'react'
import Service from '../../utils/service'
import {withRouter} from 'react-router-dom'
import _ from 'lodash'

@withRouter
class AuthRoute extends Component {
    componentDidMount() {
        //get user info
        //login or not
        //user identity ? boss : seeker
        //finish user info
        const service = new Service()
        const publicList = ['/login','/register']
        const pathname = this.props.location.pathname
        if(_.indexOf(publicList,pathname)!==-1){
            return null
        }
        service.get('user/info').then(res => {
            if (_.get(res,'status') === 200) {
                if(_.get(res.data,'code')===0){
                    //user login
                    console.log('login')
                }else{
                    this.props.history.push('/login');
                }
            }
        })
    }
    render(){
        return(

            <p>判断跳转的地方</p>
        )
    }
}

export default AuthRoute