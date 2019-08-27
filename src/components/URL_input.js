import React, { Component, createRef } from 'react'
import styled from 'styled-components'
import PulseLoader from 'react-spinners/PulseLoader';
import firebase from 'firebase';
import { connect } from "react-redux";
import { Actions } from '../duck'

class URLinput extends Component {
  constructor(props){
    super(props)
    this.URLinput = createRef()
    this.state = {
      status: 'ready',
      inputColor: {
        ready: '#707070',
        wrong: 'red'
      }
    }
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

  shortener = (url, length = 4, count = 0) => {
    return new Promise((resolve, reject) => {
      let newURL = '';
      if( count / 10 > 1) {
        length++;
        count = 0;
      }
      for (let i = 0; i < length; i++) {
        newURL += String.fromCharCode((Math.random()*100 % 26) + 97);
      }
      firebase.firestore().collection('URLs').where('newURL','==',newURL).get().then(querySnapshot => {
        if(querySnapshot.empty){
          firebase.firestore().collection('URLs').add({
            baseURL: url,
            shortenURL: newURL,
            count: 0,
            lastVisited: firebase.firestore.FieldValue.serverTimestamp()
          }).then(()=>{
            return resolve(newURL);
          })
        } else {
          return this.shortener(url, length, count++)
        }
      })
    })
  }

  DoIt = async () => {
    if(this.state.status == 'ready'){
      let url = this.URLinput.current.value
      if(this.isURL(url)){
        this.props.create_link()
        this.setState({loading: true})
        let newURL = await this.shortener(url)
        this.URLinput.current.value = window.location.host + '/' + newURL
        this.setState({loading: false, inputText: 'copy', status: 'done'})
        this.props.link_created_successfully()
      } else {
        this.setState({status: 'wrong'})
        alert("Wrong URL adress")
      }
    } else if(this.state.status == 'wrong') {
      alert("Wrong URL adress")
    } else {
      this.copyToClipboard()
      alert('URL was copied to the clipboard')
    }
  }

  copyToClipboard = () => {
    var textField = document.createElement('textarea')
    textField.innerText = this.URLinput.current.value
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
  }

  check = () => {
    if(this.isURL(this.URLinput.current.value)){
      this.setState({status: 'ready'})
    } else {
      this.setState({status: 'wrong'})
    }
  }

  render(){
    const { buttonText, loading } = this.props
    return (
      <InputConatiner>
        <Input onChange={this.check} type="text" placeholder="Type your URL" ref={this.URLinput} style={{color: this.state.status != 'wrong' ? '#707070' : 'red'}} />
        <Button onClick={this.DoIt}>
          {!loading ? buttonText : ''}
          <PulseLoader
            sizeUnit={"px"}
            size={15}
            color={'#fff'}
            loading={loading}
          />
        </Button>
      </InputConatiner>
    )
  }
}

const mapStateToProps = (state) => ({
  buttonText: state.default.button,
  loading: state.default.loading
})

const mapDispatchToProps = {
  create_link: Actions.create_link,
  link_created_successfully: Actions.link_created_successfully
}

export default connect(mapStateToProps, mapDispatchToProps)(URLinput)


const InputConatiner = styled.div`
  display: flex;
  flex-direction: row;
  width: 982px;
  justify-content: center;
  box-shadow: 3px 0 6px 0px rgba(0,0,0,0.16);
  border-bottom-left-radius: 24px;
  border-top-right-radius: 24px;
`

const Input = styled.input`
  height: 48px;
  padding: 0;
  border: 0;
  border-bottom-left-radius: 24px;
  width: 836px;
  font-size: 16px;
  padding-left: 24px;
  font-weight: 500;
  font-family: Roboto;
  color: #707070;
  &:focus ${this}{
    outline: none;
  }
`

const Button = styled.p`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  height: 48px;
  width: 146px;
  font-size: 20px;
  font-weight: 500;
  font-family: Roboto;
  text-align: center;
  justify-content: center;
  align-content: center;
  text-transform: uppercase;
  color: #fff;
  background: #00D2FF;
  border-top-right-radius: 24px;
  cursor: pointer;
  transition: ease-in .1s;
  &:hover ${this} {
    font-size: 21px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 24px;
  }
`
