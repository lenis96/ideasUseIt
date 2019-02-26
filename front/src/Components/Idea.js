import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,ListGroup,ListGroupItem,ListGroupItemHeading,ListGroupItemText } from 'reactstrap';
import {getBoards} from './../utils/api'
class Idea extends Component {
    

    constructor(props){
        super(props)
        this.state={}
    }
    componentDidMount(){
    }
    render(){
        return (
            <ListGroupItem>
                <ListGroupItemHeading>{this.props.description}</ListGroupItemHeading>
            </ListGroupItem>
        )
    }
  }
export default Idea