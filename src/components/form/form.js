import React, { Component } from 'react';

export default function form(Comp){
    return class WrapperComp extends Component{
        state={}
        handleChange=(key,val)=>{
            console.log('form',key,val)
            this.setState({
                [key]:val
            })
        }
        render(){
            
            return(
                <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
            )
        }
    }
}