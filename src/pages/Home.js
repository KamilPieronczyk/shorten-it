import React, { Component } from 'react'
import Layout from '../layouts/layout'
import styled from 'styled-components'
import Box from '../components/box'
import URLinput from '../components/URL_input'
import { connect } from 'react-redux'

class Home extends Component {
  render(){
    const header = this.props.header
    return (
      <Layout>
        <Title>{header}</Title>
        <URLinput />
        <BoxContainer>
          <Box primary="#FF8008" secondary="#FFC837" title="basic">
            Simple to use, without unnecessary authentication and registration. Just paste your link and enjoy with your shorten web address
          </Box>
          <Box primary="#1FA2FF" secondary="#A6FFCB" middle="#12D8FA" title="forever">
            Don't care about saving your shorten links on cards, paper or even in the browser, now your links are waiting for you in MyLinks page
          </Box>
          <Box primary="#1D976C" secondary="#93F9B9" title="no limits">
            You don't have to be concerned about how many links you can create, Here you can create that how many you need, of course try not to fill our memory in all
          </Box>
        </BoxContainer>
      </Layout>
    )
  }
}

const mapStateToProps = (state) => ({
  header: state.default.header
})

export default connect(mapStateToProps)(Home)


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
