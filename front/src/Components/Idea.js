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

import { FaBeer } from 'react-icons/fa';
import {IoIosCloseCircleOutline,IoIosCheckmarkCircleOutline} from 'react-icons/io'
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
        const deleteButtonStyle={
            float:'right',
            marginLeft:'2px',
            marginRight:'2px',
        }
        const buttonRight = {
            float:'right',
            marginLeft:'2px',
            marginRight:'2px',
        };
        const circleButton={
            borderRadius:'50%',
            float:'right',
            marginLeft:'2px',
            marginRight:'2px',

        }
        let deleteButton
        let approveButton
        if(this.props.user_id==1){
            deleteButton=<Button style={buttonRight} color="link" onClick={this.deleteIdea}><IoIosCloseCircleOutline color="red" size={32}/></Button>
        }
        if(!this.props.approved){
            approveButton=<Button style={buttonRight} color="link" on onClick={this.approveIdea}><IoIosCheckmarkCircleOutline color="green" size={32}/></Button>
        }
        return (
            <ListGroupItem color={!this.props.approved?'warning':''}>
                {/* <ListGroupItemHeading>
                </ListGroupItemHeading> */}
                <ListGroupItemText>
                    {this.props.description}
                    {deleteButton}
                    {approveButton}
                </ListGroupItemText>
            </ListGroupItem>
        )
    }
  }
export default Idea