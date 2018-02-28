import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import _ from 'lodash'

import {connect} from 'react-redux'

import '../files/icon.css'

@connect(
    state=>state.chat,
)

@withRouter
export default class NavLinkBar extends Component {
  static propTypes = {
    data:PropTypes.array.isRequired
  }
  renderTabBar=()=>{
    let navList = this.props.data
    navList = navList.filter(item=>!_.get(item,'hide'))
    const {pathname} = _.get(this,'props.location')
    const renderNavList = navList.map(item=>
    (<TabBar.Item
        badge={item.path==='/msg'?this.props.unread:null}
        key={_.get(item,'path')}
        title={_.get(item,'text')}
        icon={<i className={`icon-${_.get(item,'icon')}`}></i>}
        selectedIcon={<i className={`icon-${_.get(item,'icon')} active`}></i>}
        selected={pathname===_.get(item,'path')}
        onPress={()=>{
                  this.props.history.push(_.get(item,'path'))
        }}
    >
  
    </TabBar.Item>))
  
    return (<TabBar>{renderNavList}</TabBar>)
  }
  
  render() {

    return (
      <div>
        {this.renderTabBar()}
      </div>
    )
  }
}
