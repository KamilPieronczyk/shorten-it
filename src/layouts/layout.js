import React, { Component } from 'react'
import './layout.css'

export default class Layout extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const {children} = this.props
    return (
      <div className="container">
        {children}
      </div>
    )
  }
}
