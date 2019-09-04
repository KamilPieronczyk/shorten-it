import React, { Component } from 'react'
import Layout from '../layouts/layout'
import styled from 'styled-components'
import PulseLoader from 'react-spinners/PulseLoader';
import firebase from 'firebase';

export default class Redirect extends Component {

  constructor(props){
    super(props)
    this.state = {
      loading: true
    }
    this.URL = this.props.match.params.url
  }

  componentDidMount(){
    firebase.firestore().collection('URLs').where('shortenURL','==',this.URL).get().then(querySnapshot => {
      if(!querySnapshot.empty){
        querySnapshot.docs[0].ref.update({
          count: firebase.firestore.FieldValue.increment(1)
        }).then(()=>{
          window.location.href = querySnapshot.docs[0].data().baseURL
        })
      } else {
        alert("Niestety nie ma takiego linku w bazie danych. Przepraszamy")
        this.setState({loading: false})
      }
    })
  }

  render() {
    return (
      <Layout>
        <Title>Redirecting</Title>
        <PulseLoader
          sizeUnit={"px"}
          size={45}
          color={'#fff'}
          loading={this.state.loading}
        />
      </Layout>
    )
  }
}

const Title = styled.p`
  font-size: 100px;
  color: #fff;
  font-family: Roboto;
  font-weight: 500;
  margin-top: 200px;
  text-transform: uppercase;
`

const BoxContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 982px;
  margin-top: 55px;
`
