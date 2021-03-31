import React, { Component } from 'react';
import {Route, BrowserRouter as Router, Switch, Redirect} from 'react-router-dom';

// Components
import AppNavbar from './components/AppNavbar';

// Pages
import Home from './views/Home';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

function App() {
  return (
    <div className="App">
        <Router>
            <AppNavbar />
            <Switch>
                <Route path={["/home", "/index"]} component={Home} />
                <Route path="/about" />
                <Route path="/profile" />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
