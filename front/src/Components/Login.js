import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import { Button } from 'reactstrap';
  

class Login extends Component {
    constructor(props){
        super(props)
        this.state= {
          redirectToReferrer: false
        };
    }
    
    login = () => {
      this.props.fakeAuth.authenticate(() => {
        this.setState({ redirectToReferrer: true });
      });
    };
    
    render() {
        console.log(this.state)
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      const { redirectToReferrer } = this.state;
  
      if (redirectToReferrer) {
        return <Redirect to={from} />;
      }
  
      return (
        <div>
          <p>You must log in to view the page at {from.pathname}</p>
          <Button onClick={this.login}>Log in</Button>
        </div>
      );
    }
  }
export default Login