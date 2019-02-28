import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,ListGroup } from 'reactstrap';
import {getBoards} from './../utils/api'

import Idea from './Idea'
import {IoMdAddCircle} from 'react-icons/io' 
import './../css/style.css'
class Board extends Component {
    

    constructor(props){
        super(props)
        this.state={ideas:[]}
    }
    componentDidMount(){
    }
    handleCreateIdea=(idIdea)=>{
        if(idIdea){
            console.log('><',idIdea)
            this.props.toggleModalCreateIdea(this.props.idBoard,idIdea)
        }
        else{
            this.props.toggleModalCreateIdea(this.props.idBoard,null)
        }
    }
    render(){
        const addIdeaStyle={
            marginTop:'10px',
            float:'right'
        }
        return (
            <div>
                <Card body outline color={this.props.is_public?'success':'primary'}>
                    {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
                    <CardBody>
                    <CardTitle>{this.props.title} {this.props.is_public?<span>(Public)</span>:<span>(Private)</span>}</CardTitle>
                    {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                        <ListGroup class="list-group">
                            {this.props.ideas.map((e)=>{
                                return <Idea key={e.id} ShowEditIdea={this.handleCreateIdea} owner_board={this.props.user} updateBoards={this.props.updateBoards} ideaId={e.id} user_id={e.user} approved={e.approved} description={e.description}/>
                            })}
                        </ListGroup>
                    {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                    <Button style={addIdeaStyle} color="link" onClick={this.handleCreateIdea}><IoMdAddCircle color="green" size={48}/></Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
  }
export default Board