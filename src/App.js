import React ,{ useEffect } from 'react';
import PageRedirect from './pages/Redirect'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { createBrowserHistory as history } from 'history';
import firebase from 'firebase'

import Home from './pages/Home'
import Auth from './pages/Auth'
import MyLinks from './pages/MyLinks'

function App({store}) {
  useEffect(()=>{
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        store.dispatch({type: 'SIGN_IN', user })
      } else {
        store.dispatch({type: 'SIGN_OUT'})
      }
    })
  })
  return (
    <Provider store={store}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/page/auth" component={Auth} />
          <Route exact path="/page/mylinks" component={MyLinks} />
          <Route exact path="/:url" component={PageRedirect} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
