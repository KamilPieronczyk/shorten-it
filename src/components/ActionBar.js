import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPlus, faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import { Actions } from '../duck'
import firebase from 'firebase'

class ActionBar extends Component {
  toggleDelete = () => {
    switch (this.props.deleteMode) {
      case true:
        const docDelete = (id) => firebase.firestore().collection('URLs').doc(id).delete()
        const storageDelete = (id) => firebase.storage().ref(`screenshots/${id}`).delete()
        const deleteLocal = (id) => localStorage.removeItem(id)
        this.props.list.map(id => {
          docDelete(id)
          storageDelete(id)
          deleteLocal(id)
        })
        this.props.delete_links()
        break;
      case false:
        this.props.turn_on()
        break;
    }
  }
  render() {
    return (
      <Container>
        {
          this.props.deleteMode ?
          <Button onClick={this.props.turn_off}>
            <FontAwesomeIcon icon={faLongArrowAltLeft} size="2x" />
          </Button> : null
        }
        <ButtonDelete deleteMode={this.props.deleteMode} onClick={this.toggleDelete}>
          <FontAwesomeIcon icon={faTrash} size="2x" />
        </ButtonDelete>
        <Button onClick={this.props.open}>
          <FontAwesomeIcon icon={faPlus} size="2x" />
        </Button>
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({
  deleteMode: state.deletion.deleteMode,
  list: state.deletion.list
})

const mapDispatchToProps = {
  turn_on: Actions.turn_on_delete_mod,
  turn_off: Actions.turn_off_delete_mod,
  delete_links: Actions.delete_links
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
  transition: .3s ease
`

const ButtonDelete = styled(Button)`
  background-color: ${props => props.deleteMode ? 'red' : '#00D2FF'}
`
