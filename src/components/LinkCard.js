import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

class LinkCard extends Component {
  constructor(props){
    super(props)
  }

  openWebsite = () => {
    window.open(window.location.host + '/' + encodeURIComponent(this.props.shortenURL), '_blank');
  }

  copyToClipboard = () => {
    var textField = document.createElement('textarea')
    textField.innerText = window.location.host + '/' + this.props.shortenURL
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    this.props.open(true)
  }

  render() {
    const {count, shortenURL} = this.props
    return (
      <Card>
        <Overlay>
          <Counter>
            {count}
          </Counter>
          <Name>
            {shortenURL}
          </Name>
          <Layer>
            <PrimaryButton onClick={this.openWebsite}>Open</PrimaryButton>
            <SecondaryButton onClick={this.copyToClipboard}>Copy</SecondaryButton>
          </Layer>
        </Overlay>
      </Card>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(LinkCard)

const Card = styled.div`
  position: relative;
  width: 310px;
  height: 170px;
  background-image: url('https://www.bluefountainmedia.com/sites/default/files/2018-08/services_EXPERIENCE_WebsiteDesign_0.jpg');
  background-size: cover;
  z-index: 1;
  margin-bottom: 40px;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,.3);
  z-index: 2;
`

const Counter = styled.div`
  position: absolute;
  width: 36px;
  height: 36px;
  right: 12px;
  top: 12px;
  border-radius: 18px;
  background-color: rgba(23,249,226,.6);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16;
  font-weight: 500;
  color: #fff;
  z-index: 3;
`

const Name = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25px;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  z-index: 3;
`

const Layer = styled(Overlay)`
  z-index: 4;
  background: rgba(0,0,0,.5);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 60px 0 60px;
  box-sizing: border-box;
  opacity: 0;
  transition: .15s ease-in;
  ${Overlay}:hover & {
    opacity: 1;
  }
`

const PrimaryButton = styled.button`
  padding: 7px 20px 7px 20px;
  font-size: 18px;
  font-weight: 500;
  font-family: Roboto;
  color: #FF840B;
  border: 2px solid #FF840B;
  box-sizing: border-box;
  z-index: 5;
  background: transparent;
  border-radius: 7px;
  cursor: pointer;
`

const SecondaryButton = styled(PrimaryButton)`
  color: rgba(255,255,255,.9);
  border: 0;
`
