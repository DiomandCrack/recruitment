import React, { Component } from 'react'
import {connect} from 'react-redux'

import {getUserList} from '../../redux/reducers/chatUser'
import UserCard from '../userCard/UserCard'

@connect(
    state=>state.chatToUser,
    {getUserList}
)
export default class Seeker extends Component {
    componentDidMount(){
        this.props.getUserList('boss')
    }

    render() {
        return (
            <UserCard userList={this.props.userList}/>
        )
    }
}
