import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Button} from 'antd-mobile'
import _ from 'lodash'

@connect(
    state=>state.user,

)
export default class User extends Component {
    
    render() {
        const {avatar,type,company,title,desc,payroll} = _.get(this,'props')
        const {Item} = List
        const {Brief} = Item
        console.log(this.props)
        return (
        <div>
            {avatar?<Result
                img={<img src={require(`../files/images/${avatar}.png`)} alt={`${avatar}`}/>}
                title={_.get(this,'props.user')}
                message={type === 'boss'?company:null}
            />:null}
            <List renderHeader={()=>type === 'boss'?'招聘信息':'求职信息'}>
                <Item
                    wrap
                >
                    {title}
                    <Brief>
                        <pre>
                            {desc}
                        </pre>
                        {payroll?payroll:null}
                    </Brief>
                </Item>
            </List>
            <WhiteSpace/>
            <List>
                <Item>
                    <Button type='primary'>退出登录</Button>
                </Item>
            </List>
        </div>
        )
    }
}
