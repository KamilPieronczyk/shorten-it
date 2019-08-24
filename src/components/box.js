import React, { Component } from 'react'
import styled from 'styled-components'

export default class Box extends Component {
  constructor(props){
    super(props)
    if(this.props.middle !== undefined){
      this.gradient = `linear-gradient(to right,${this.props.primary},${this.props.middle},${this.props.secondary})`
    } else {
      this.gradient = `linear-gradient(to right,${this.props.primary},${this.props.secondary})`
    }
  }
  render() {
    return (
      <Container>
        <Title style={{background: this.gradient}}>
          {this.props.title}
        </Title>
        <Line />
        <Content style={{background: this.gradient}}>
          {this.props.children}
        </Content>
      </Container>
    )
  }
}

const Container = styled.div`
  width: 276px;
  height: 194px;
  border-bottom-left-radius: 24px;
  border-top-right-radius: 24px;
  background: transparent;
`
const Title = styled.div`
  height: 42px;
  width: 100%;
  font-size: 20px;
  font-weight: 500;
  font-family: Roboto;
  padding-left: 22px;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  color: #fff;
  border-top-right-radius: 24px;
  text-transform: uppercase;
`
const Line = styled.hr`
  width: 276px;
  height: 5px;
  background: transparent;
  margin: 0;
  padding: 0;
  border: 0;
`

const Content = styled.div`
  width: 276px;
  max-height: 130px;
  font-size: 16px;
  font-family: Roboto;
  color: #000;
  padding: 10px 22px 22px;
  box-sizing: border-box;
  border-bottom-left-radius: 24px;
`