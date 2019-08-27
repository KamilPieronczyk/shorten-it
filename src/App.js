import React from 'react';
import Redirect from './pages/Redirect'
import { Provider } from 'react-redux'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './pages/Home'

function App({store}) {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route exact path="/:url" component={Redirect} />
      </Router>
    </Provider>
  );
}

export default App;
