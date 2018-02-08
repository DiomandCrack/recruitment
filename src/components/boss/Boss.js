import React, { Component } from 'react'
import {connect} from 'react-redux'

import {getUserList} from '../../redux/reducers/chat'

import UserCard from '../userCard/UserCard'

@connect(
	state=>state.chatToUser,
	{getUserList}
)
export default class Boss extends Component {
	componentDidMount(){
		this.props.getUserList('seeker')
	}

	render() {
		return (
			<UserCard userList={this.props.userList}/>
		)
	}
}
