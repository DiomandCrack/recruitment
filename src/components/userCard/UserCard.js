import React, { Component } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {WingBlank,WhiteSpace,Card} from 'antd-mobile'
//show user data
export default class UserCard extends Component {
    static propTypes = {
		userList:PropTypes.array.isRequired

		}
    render() {
		return (
			<WingBlank>
				<WhiteSpace/>
				{ _.map(_.get(this,'props.userList'),(item)=>(
					_.get(item,'avatar')?
					<Card key={_.get(item,'_id')} style={{marginTop:'1rem'}}>
						<Card.Header
							title={_.get(item,'user')}
							thumb={require(`../files/images/${_.get(item,'avatar')}.png`)}
							extra={<span>{_.get(item,'title')}</span>}
						>
						</Card.Header>
						<Card.Body>
							
							{_.get(item,'type')==='boss'?
							[
								<div className='title' key={_.get(item,'company')}>{_.get(item,'company')}</div>,
								<div className='primary' key={_.get(item,'payroll')}>{_.get(item,'payroll')}</div>]:null}
							<pre style={{font:'inherit',lineHeight:'1.5'}} >
							{_.get(item,'desc')}
							</pre>
							
						</Card.Body>
					</Card>
					:
					null
				))}
			</WingBlank>
		)
    }
}
