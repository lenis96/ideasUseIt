import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import { Button,Form,FormGroup,Input,Label } from 'reactstrap';
import {signup} from './../utils/api'
  

class SignupForm extends Component {
    constructor(props){
        super(props)
        this.state= {
            firstName:'',
            lastName:''
        };
    }
    
    changeInput=(event)=>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }

    registerUser=()=>{
        console.log(this.state)
        signup(this.state).then(res=>{
            console.log(res.data)
        })
    }
    render() {
      return (
          <div className="contanier">
          <div className="row">
          <div className="col-4"></div>
          <div className="col-4">
        <Form>
            <FormGroup >
                <Label>First Name</Label>
                <Input type="text" onChange={this.changeInput} value={this.state.firstName} name="firstName"  placeholder="first name" />
            </FormGroup>
            <FormGroup >
                <Label>Last Name</Label>
                <Input type="text" onChange={this.changeInput} value={this.state.lastName} name="lastName"  placeholder="last name" />
            </FormGroup>
            <FormGroup >
                <Label>Username</Label>
                <Input type="text" onChange={this.changeInput} value={this.state.username} name="username"  placeholder="username" />
            </FormGroup>
            <FormGroup >
                <Label>Email</Label>
                <Input type="email" onChange={this.changeInput} value={this.state.email} name="email"  placeholder="email" />
            </FormGroup>
            <FormGroup >
                <Label>Password</Label>
                <Input type="password" onChange={this.changeInput} value={this.state.password} name="password"  placeholder="password" />
            </FormGroup>
            <FormGroup >
                <Label>Confirm Password</Label>
                <Input type="password" onChange={this.changeInput} value={this.state.passwordConfirmation} name="passwordConfirmation"  placeholder="password confirmation" />
            </FormGroup>
            <FormGroup >
                <Label>Identification Number</Label>
                <Input type="text" onChange={this.changeInput} value={this.state.identificationNumber} name="identificationNumber"  placeholder="identification number" />
            </FormGroup>
            <FormGroup>
                <Label>Photo</Label>
                <Input type="file" onChange={this.changeInput} name="photo"></Input>
            </FormGroup>
            <Button color="primary" onClick={this.registerUser}>
                Signup
            </Button>
        </Form>
          </div>

          </div>
          </div>
      );
    }
  }
export default SignupForm