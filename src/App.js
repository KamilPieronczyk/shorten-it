import React from 'react';
import Redirect from './pages/Redirect'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/:url" component={Redirect} />
    </Router>
  );
}

export default App;
