import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'

class ActionBar extends Component {
  render() {
    return (
      <Container>
        <Button>
          <FontAwesomeIcon icon={faTrash} size="2x" />
        </Button>
        <Button onClick={this.props.open}>
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionBar)

const Container = styled.div`
  position: absolute;
  right: -100px;
  top: 260px;
  width: 50px;
`

const Button = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 8px;
  background-color: #00D2FF;
  box-shadow: 0px 3px 10px -2px #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin-bottom: 17px;
  cursor: pointer;
`
