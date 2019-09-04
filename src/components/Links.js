import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import LinkCard from './LinkCard'
import firebase from 'firebase'
import Snackbar from '@material-ui/core/Snackbar';

class Links extends Component {
  constructor(props){
    super(props);
    this.state = {
      links: [],
      snackbarIsOpen: false
    }
  }

  componentDidMount(){
    if(!firebase.auth().currentUser) return this.props.history.push('/page/auth')
    let uid = firebase.auth().currentUser.uid
    firebase.firestore().collection('URLs').where('user','==',uid).onSnapshot( querySnapshot => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          this.setState( ({links}) => links.push({...change.doc.data(), id: change.doc.id}))
        }
        if (change.type === "removed") {
          this.setState( ({links}) => links.filter(item => item.id != change.doc.id))
        }
      });
    })
  }

  openSnackbar = (isOpen) => {
    this.setState({snackbarIsOpen: isOpen})
  }

  render() {
    return (
      <Container>
        {this.state.links.map(link =>
          <LinkCard {...link} open={this.openSnackbar} />
        )}
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          key={`top,right`}
          open={this.state.snackbarIsOpen}
          onClose={()=>this.openSnackbar(false)}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          autoHideDuration={5000}
          message={<span id="message-id">Url has been copied</span>}
        />
      </Container>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Links)

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
