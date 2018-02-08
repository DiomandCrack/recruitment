import React, { Component } from 'react'
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
import _ from 'lodash'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/reducers/chat'

@connect(
    state=>state.chatToUser,
    {getUserList}
)
export default class Boss extends Component {
    state = {
        data:[]
    }

    componentDidMount(){
        this.props.getUserList('seeker')
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
