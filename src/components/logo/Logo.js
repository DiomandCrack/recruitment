import React, { Component } from 'react'
import logo from '../files/logo.jpg'
import './Logo.css'

export default class Logo extends Component {
    render() {
        return (
            <div className="logo-container">
                <img src={logo} alt="logo"/>
            </div>
        )
    }
}