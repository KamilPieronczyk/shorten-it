import React, { Component } from 'react'
import { connect } from 'react-redux'
import Layout from '../layouts/layout'
import styled from 'styled-components'
import firebase from 'firebase'
import { Actions } from '../duck'

class Auth extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    if(this.props.user != null) {
      this.props.history.push('/page/mylinks')
      return;
    }
    let  interval = setInterval(() => {
      if(this.props.user != null) {
        clearInterval(interval)
        this.props.history.push('/page/mylinks')
      }
    }, 100);
  }

  onClick = () => {
    var provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken
      // The signed-in user info.
      var user = result.user
      this.props.sign_in(user)
      this.props.history.push('/page/mylinks')
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }

  render() {
    return (
      <Layout>
        <Container>
          <Border>
            <H1>
              GET ACCESS TO YOUR LINKS
            </H1>
            <Content>
              To get access and capability of management of yours links sign in with Google and enjoy administrat yours web addresses 
            </Content>
            <Button onClick={this.onClick}>
              sign in with google
            </Button>
          </Border>
        </Container>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user
})

const mapDispatchToProps = {
  sign_in: Actions.sign_in,
  sign_out: Actions.sign_out
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 60px);
`

const Border = styled.div`
  border: 30px solid #fff;
  width: 1000px;
  height: 540px;
  border-image: linear-gradient(to right, #1FA2FF , #A6FFCB);
  border-image-slice: 1;
  box-shadow: 0 3px 10px 0px rgba(0,0,0,.6);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  padding: 50px 150px 50px 150px;
  box-sizing: border-box;
`

const H1 = styled.h1`
  font-family: Roboto;
  color: #fff;
  font-size: 37px;
  font-weight: 500;
  margin: 0;
  margin-bottom: -15px;
  padding: 0;
`
const Content = styled.p`
  font-family: Roboto;
  color: #fff;
  font-size: 22px;
  margin: 0;
  padding: 0;
`
const Button = styled.button`
  font-family: Roboto;
  font-weight: 500;
  color: #fff;
  font-size: 20px;
  height: 50px;
  width: 300px;
  background: #00D2FF;
  border: 0;
  text-transform: uppercase;
  box-shadow: 0 3px 5px 0px rgba(0,0,0,.6);
`