import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
import _ from 'lodash'
import {WingBlank,WhiteSpace,Card} from 'antd-mobile'
//show user data
@withRouter
export default class UserCard extends Component {
    static propTypes = {
		userList:PropTypes.array.isRequired

		}
	handleClick = (item) => {
		this.props.history.push(`/chat/${_.get(item,'_id')}`)
		// window.location.reload()
	}
    render() {
		console.log(this.props)
		return (
			<WingBlank>
				<WhiteSpace/>
				{ this.props.userList.length!==0?_.map(_.get(this,'props.userList'),(item)=>(
					_.get(item,'avatar')?
					<Card 
						key={_.get(item,'_id')} 
						style={{marginTop:'1rem'}}
						onClick={()=>this.handleClick(item)}
						>
						<Card.Header
							title={_.get(item,'user')}
							thumb={require(`../files/images/${_.get(item,'avatar')}.png`)}
							extra={<span>{_.get(item,'title')}</span>}
						>
						</Card.Header>
						<Card.Body>
							
							{_.get(item,'type')==='boss'?
							[
								<div className='title' key='company'>{_.get(item,'company')}</div>,
								<div className='primary' key='payroll'>{_.get(item,'payroll')}</div>]:null}
							<pre style={{font:'inherit',lineHeight:'1.5'}} >
							{_.get(item,'desc')}
							</pre>
							
						</Card.Body>
					</Card>
					:
					null
				)):null}
			</WingBlank>
		)
    }
}
