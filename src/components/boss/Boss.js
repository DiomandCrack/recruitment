import React, { Component } from 'react'
import {Card,WhiteSpace,WingBlank} from 'antd-mobile'
import _ from 'lodash'

import Service from '../../utils/service'

const service = new Service();

export default class Boss extends Component {
    state = {
        data:[]
    }

    componentDidMount(){
        service.get('user/list?type=seeker').then(res=>{
            if(res.data.code===0){
                this.setState({data:res.data.data})
            }
        }).catch(err=>console.log(err));
    }

    render() {
        console.log(this.state)
        return (
            <WingBlank>
                <WhiteSpace/>
                { _.map(_.get(this,'state.data'),(item)=>(
                    _.get(item,'avatar')?
                    <Card key={_.get(item,'_id')}>
                        <Card.Header
                            title={_.get(item,'user')}
                            thumb={require(`../files/images/${_.get(item,'avatar')}.png`)}
                            extra={<span>{_.get(item,'title')}</span>}
                        >
                        </Card.Header>
                        <Card.Body>
                            <pre style={{font:'inherit'}}>
                            {_.get(item,'desc')}
                            </pre>
                        </Card.Body>
                    </Card>:
                    null
                ))}
            </WingBlank>
        )
    }
}
