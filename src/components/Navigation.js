import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'


class Navigation extends Component {
  render() {
    return (
      <Container>
        <Button to='/'>Home</Button>
        {
          this.props.user != null ?
            <Button to='/page/mylinks'>My Links</Button>
            :
            <Button to='/page/auth'>My Links</Button>
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(Navigation)


const Container = styled.div`
  position: absolute;
  top: 55px;
  right: 140px;
  display: flex;
  flex-direction: row;
`

const Button = styled(Link)`
  margin: 0;
  margin-left: 30px;
  padding: 0;
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;
  cursor: pointer;
  text-decoration: none;
`
