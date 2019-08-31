import React from 'react';
import Redirect from './pages/Redirect'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory as history } from 'history';

import Home from './pages/Home'
import Auth from './pages/Auth'
import MyLinks from './pages/MyLinks'

function App({store}) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route exact path="/page/auth" component={Auth} />
        <Route exact path="/page/mylinks" component={MyLinks} />
        <Route exact path="/:url" component={Redirect} />
      </Router>
    </Provider>
  );
}

export default App;
