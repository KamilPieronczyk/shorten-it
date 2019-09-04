import React, { Component } from 'react'
import './layout.css'
import Navigation from '../components/Navigation'

export default class Layout extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const {children} = this.props
    return (
      <div className="container">
        <Navigation />
        {children}
      </div>
    )
  }
}
