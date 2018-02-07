import React, { Component } from 'react'
import Service from '../../utils/service'

export default class Boss extends Component {
    state = {
        data:[]
    }
    componentDidMount(){
        Service.get('/user/list?type=seeker').then(res=>{
            if(res.data.code===0){
                this.setState({data:res.data.data})
            }
        }).catch();
    }

    render() {
        return (
        <div>
            
        </div>
        )
    }
}
