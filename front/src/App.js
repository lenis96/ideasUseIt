import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import Login from './Components/Login'
import AppIdeas from './Components/AppIdeas'
import SignupForm from './Components/SignupForm';




const fakeAuth = {
  isAuthenticated: localStorage.getItem('token')?true:false,
  authenticate(cb) {
    this.isAuthenticated = true;
    localStorage.setItem('token',1)
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    localStorage.setItem('token',null)
    setTimeout(cb, 100);
  }
};

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        Welcome!{" "}
        <button
          onClick={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
          >
          Sign out
        </button>
      </p>
    ) : (
      <p>You are not logged in.</p>
    )
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
  {...rest}
  render={props =>
      fakeAuth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
        to={{
          pathname: "/login",
          state: { from: props.location }
          }}
          />
      )
    }
    />
);

const Public = () => <h3>Public</h3>;
const Protected = () => <h3>Protected</h3>;




class App extends Component {
  render() {
    return (
     
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li>
            <Link to="/app">App</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <Route path="/signup" component={SignupForm} />
        <Route path="/login" render={(props)=><Login {...props} fakeAuth={fakeAuth}/>} />
        <PrivateRoute path="/app" component={AppIdeas} />
      </div>
    </Router>
      
    );
  }
}

export default App;
