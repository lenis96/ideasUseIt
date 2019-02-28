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



// console.log(localStorage.getItem('token')==='null')
const fakeAuth = {
  isAuthenticated: localStorage.getItem('token')!=null?true:false,
  authenticate() {
    if(localStorage.getItem('token')){
      this.isAuthenticated = true;
    }
  },
  signout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token')
  }
};
console.log(fakeAuth.isAuthenticated)

const AuthButton = withRouter(
  ({ history }) =>
    fakeAuth.isAuthenticated ? (
      <p>
        <button
          onClick={() => {
            fakeAuth.signout()
            history.push("/");
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
  constructor(props){
    super(props)
  }
  
  render() {
    return (
      
    <Router>
      <div>
        <AuthButton />
        <ul>
          <li>
            <Link to="/">App</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
        <Route path="/signup" component={SignupForm} />
        <Route path="/login" render={(props)=><Login {...props} fakeAuth={fakeAuth}/>} />
        <Route exact path="/" component={AppIdeas} />
      </div>
    </Router>
      
    );
  }
}

export default App;
