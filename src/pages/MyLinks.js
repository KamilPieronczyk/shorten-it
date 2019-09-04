import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import firebase from 'firebase'
import { Actions } from '../duck'
import Layout from '../layouts/layout'
import styled from 'styled-components'
import Links from '../components/Links'
import ActionBar from '../components/ActionBar'
import { Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SendIcon from '@material-ui/icons/Send';
import { faRegistered } from '@fortawesome/free-solid-svg-icons';
import { reject } from 'q';
import { resolveObject } from 'url';


class MyLinks extends Component {
  constructor(props){
    super(props)
    this.state = {
      formVisibility: false,
      urlError: false,
      nameError: false,
      nameStatus: 'empty',
      lastTimeNameModified: Date.now(),
      disableCreateButton: false
    }
    this.URLref = createRef()
    this.nameRef = createRef()
  }

  close = () => {
    this.setState({formVisibility: false, urlError: false, nameError: false})
  }

  open = () => {
    this.setState({formVisibility: true})
  }

  isURL = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }

  handleURL = (url) => {
    if(this.isURL(url))
      this.setState({urlError: false})
    else
      this.setState({urlError: true})
  }

  create = async () => {
    const {nameError, nameStatus, urlError } = this.state
    const nameAvailable = await this.isNameAvailable(this.nameRef.current.value)
    if(!nameError && !urlError && nameStatus == 'checked' && nameAvailable){
      this.setState({disableCreateButton: true})
      let URLs = firebase.firestore().collection('URLs')
      URLs.add({
        baseURL: this.URLref.current.value,
        count: 0,
        lastVisited: firebase.firestore.FieldValue.serverTimestamp(),
        shortenURL: this.nameRef.current.value,
        user: firebase.auth().currentUser.uid
      }).then(()=>{
        this.setState({disableCreateButton: false})
        this.close()
      })
    }
  }

  isNameAvailable = (name) => {
    return new Promise((resolve, reject)=>{
      let URLs = firebase.firestore().collection('URLs')
      URLs.where('shortenURL','==',name).get().then( querySnap => {
        this.setState({nameError: !querySnap.empty})
        resolve(querySnap.empty)
      })
    })
  }

  handleName = async (name) => {
    if(Date.now() - this.state.lastTimeNameModified > 2000){
      if(name.length < 3) return this.setState({nameError: true})
      this.setState({nameStatus: 'checking'})
      let nameAvailable = await this.isNameAvailable(name)
      this.setState({nameStatus: 'checked', nameError: !nameAvailable})
    }
    this.setState({lastTimeNameModified: Date.now()})
  }


  render() {
    return (
      <Layout>
        <Container>
          <Header>My Links</Header>
          <Links history={this.props.history} />
          <ActionBar open={this.open} />
        </Container>

        <Dialog open={this.state.formVisibility} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add URL</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add new personalized url address, complete the form below.
            </DialogContentText>
            <TextField
              error={this.state.urlError}
              inputRef={this.URLref}
              autoFocus
              margin="dense"
              id="url"
              label="URL adress"
              type="text"
              onChange={(e) => this.handleURL(e.target.value)}
              fullWidth
            />
            <TextField
              error={this.state.nameError}
              inputRef={this.nameRef}
              margin="dense"
              id="name"
              label="Name"
              type="text"
              onKeyDown={(e) => this.handleName(e.target.value)}
              onChange={(e) => this.handleName(e.target.value)}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.close}>
              Close
            </Button>
            <Button onClick={this.create} disabled={this.state.nameError || this.state.urlError || this.state.nameStatus == 'checking' || this.state.disableCreateButton} color="secondary" variant="contained">
              Create
              <SendIcon style={{marginLeft: '10px'}} />
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MyLinks)

const Container = styled.div`
  padding: 0;
  margin: 0;
  width: 1020px;
  position: relative;
`

const Header = styled.h1`
  margin-top: 150px;
  padding: 0;
  font-size: 55px;
  font-weight: 500;
  color: #fff;
  text-transform: uppercase;
`
