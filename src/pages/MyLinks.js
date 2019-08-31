import React, { Component } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { Actions } from '../duck'
import Layout from '../layouts/layout'
import styled from 'styled-components'

class MyLinks extends Component {
  render() {
    return (
      <Layout>
        My Links
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(MyLinks)
