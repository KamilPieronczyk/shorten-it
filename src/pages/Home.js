import React, { Component ,useContext, useEffect } from 'react'
import Layout from '../layouts/layout'
import styled from 'styled-components'
import Box from '../components/box'
import URLinput from '../components/URL_input'

export default class Home extends React.Component {
  render(){
    return (
      <Layout>
        <Title>shorten it</Title>
        <URLinput />
        <BoxContainer>
          <Box primary="#FF8008" secondary="#FFC837" title="basic">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          </Box>
          <Box primary="#1FA2FF" secondary="#A6FFCB" middle="#12D8FA" title="forever">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          </Box>
          <Box primary="#1D976C" secondary="#93F9B9" title="fast">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          </Box>
        </BoxContainer>
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
