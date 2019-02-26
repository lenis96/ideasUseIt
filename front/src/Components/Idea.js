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
import {updateIdea,deleteIdea} from './../utils/api'
class Idea extends Component {
    

    constructor(props){
        super(props)
        this.state={}
    }
    componentDidMount(){
    }

    deleteIdea=()=>{
        deleteIdea(this.props.ideaId).then((res)=>{
            this.props.updateBoards()
        })
    }

    approveIdea=()=>{
        updateIdea(this.props.ideaId,{approved:true}).then((res)=>{
            this.props.updateBoards()
        })
    }

    render(){
        let deleteButton
        let approveButton
        if(this.props.user_id==1){
            deleteButton=<Button color="danger" onClick={this.deleteIdea}>X</Button>
        }
        if(!this.props.approved){
            approveButton=<Button color="success" on onClick={this.approveIdea}>Ap</Button>
        }
        return (
            <ListGroupItem>
                <ListGroupItemHeading>{this.props.description}</ListGroupItemHeading>
                <ListGroupItemText>
                    {approveButton}
                    {deleteButton}
                </ListGroupItemText>
            </ListGroupItem>
        )
    }
  }
export default Idea