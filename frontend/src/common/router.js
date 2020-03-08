//import { hot } from 'react-hot-loader/root';
import React, {Component} from 'react';
//import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
import { Route, Switch, HashRouter as Router, Redirect} from 'react-router-dom';
import Loadable from 'react-loadable';

//import { Actions } from './redux/actions';
//import { getStorage, http } from '../utils';

const Login = Loadable({
    loader: () =>import('../modules/login/views')
});
const App = Loadable({
    loader: () => import('../App')
});
const Register = Loadable({
    loader: () =>import('../modules/register/views')
})

class Routers extends Component {
    /*static propTypes = {
        updateAuth: PropTypes.func.isRequired,
    };*/

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/register" component={Register}/>
                    <Route path='/login' component= {Login} />
                    <Route path='/' component={App} />
                </Switch>
            </Router>
        );
    }
}

export default Routers;