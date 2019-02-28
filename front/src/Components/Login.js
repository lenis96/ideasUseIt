import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import { Button,Form,FormGroup,Label,Input} from 'reactstrap';
import {login} from './../utils/api'
  

class Login extends Component {
    constructor(props){
        super(props)
        this.state= {
          redirectToReferrer: false
        };
    }
    
    login = () => {
        login({email:this.state.username,password:this.state.password}).then((res)=>{
            localStorage.setItem('token',res.data.token)
            localStorage.setItem('username',res.data.username)
            this.props.fakeAuth.authenticate()
            this.setState({ redirectToReferrer: true });
            
        })
    };

    changeInput=(event)=>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    
    render() {
      const { from } = this.props.location.state || { from: { pathname: "/" } };
      const { redirectToReferrer } = this.state;
      console.log(localStorage.getItem('TOKEN')!=null)
      if (redirectToReferrer|| localStorage.getItem('token')!=null) {
        return <Redirect to='/' />;
      }
      
  
      return (
        <div>
          <Form>
            <FormGroup >
                <Label>Username or Email</Label>
                <Input type="text" onChange={this.changeInput} value={this.state.username} name="username"  placeholder="username or email" />
            </FormGroup>
            <FormGroup >
                <Label>Password</Label>
                <Input type="password" onChange={this.changeInput} value={this.state.password} name="password"  placeholder="passwords" />
            </FormGroup>
            <Button onClick={this.login}>Log in</Button>
            </Form>
        </div>
      );
    }
  }
export default Login