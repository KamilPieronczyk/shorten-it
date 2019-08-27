import React, { Component } from 'react'
import Layout from '../layouts/layout'
import styled from 'styled-components'
import Box from '../components/box'
import URLinput from '../components/URL_input'
import { connect } from 'react-redux';

class Home extends Component {
  render(){
    const header = this.props.header
    console.log(header)
    return (
      <Layout>
        <Title>{header}</Title>
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
