import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

// import store from './store';
import { loadUser } from './actions/authActions';
import './App.css';

// components
import AppNavbar from './components/AppNavbar';
import AppFooter from './components/AppFooter';

// pages
import Home from './pages/Home';
import Play from './pages/Play';
import NotFound from './pages/NotFound';
import Unauthorized from './pages/Unauthorized';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class App extends Component {

    static propTypes = {
        auth: PropTypes.object.isRequired,
        loadUser: PropTypes.func.isRequired
    };

    componentDidMount(){
        this.props.loadUser();
    }

    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <BrowserRouter>
                <div className="page-container">
                    <AppNavbar />
                    <div className="content-wrap">
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route path='/play' component={isAuthenticated ? Play : Unauthorized} />
                            <Route>
                                <NotFound />
                            </Route>
                        </Switch>
                    </div>
                    <AppFooter />
                </div>
            </BrowserRouter>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {loadUser})(App);