import { hot } from 'react-hot-loader/root';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, HashRouter as Router, Redirect } from 'react-router-dom';
import LoadingComponent from './components/LoadingComponent';
import Loadable from 'react-loadable';
import PrivateRoute from './components/Privateroute';

const Login = Loadable({
  loader: () => import('./modules/login/views'),
  loading: LoadingComponent,
  delay: 100
});

const Register = Loadable({
  loader: () => import('./modules/register/views'),
  loading: LoadingComponent,
  delay: 100
});

const Admin = Loadable({
  loader: () => import('./modules/admin/views'),
  loading: LoadingComponent,
  delay: 100
});

const Editor = Loadable({
  loader: () => import('./modules/editor/views'),
  loading: LoadingComponent,
  delay: 100
});

const Explorer = Loadable({
  loader: () => import('./modules/explorer/views'),
  loading: LoadingComponent,
  delay: 100
});

const Files = Loadable({
  loader: () => import('./modules/files/views'),
  loading: LoadingComponent,
  delay: 100
});

const Find = Loadable({
    loader: () => import('./modules/find/views'),
    loading: LoadingComponent,
    delay: 100
});

const Live = Loadable({
    loader: () => import('./modules/live/views'),
    loading: LoadingComponent,
    delay: 100
});

const map = Loadable({
    loader: () => import('./modules/map/views'),
    loading: LoadingComponent,
    delay: 100
});

const Self = Loadable({
    loader: () => import('./modules/self/views'),
    loading: LoadingComponent,
    delay: 100
});

const Social = Loadable({
    loader: () => import('./modules/social/views'),
    loading: LoadingComponent,
    delay: 100
});

const Software = Loadable({
    loader: () => import('./modules/files/views'),
    loading: LoadingComponent,
    delay: 100
});

const Test = Loadable({
  loader: ()=>import('./test'),
  loading: LoadingComponent,
    delay: 100
})

const Pdf = Loadable({
  loader: ()=>import('./modules/PDF'),
  loading: LoadingComponent,
    delay: 100
})

class Routers extends React.Component {

  render () {
    return (
      <Router>
        <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/find" component={Find}/>
            <Route path="/social" component={Social}/>
            <Route path="/explorer" component={Explorer} />
            <Route path="/map" component={map}/>
            <Route path="/software" component={Software}/>
            <Route path="/live" component={Live}/>
            <Route path="/self" component={Self}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/pdf" component={Pdf}/>
            <Route path="/test" component={Test}/>
            <Redirect from="/*" to="/explorer"/>
        </Switch>
      </Router>
    );
  }
}

export default hot(Routers);
