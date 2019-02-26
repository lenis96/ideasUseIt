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
class Board extends Component {
    

    constructor(props){
        super(props)
        this.state={ideas:[]}
    }
    componentDidMount(){
    }
    render(){
        return (
            <div>
                <Card>
                    {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
                    <CardBody>
                    <CardTitle>{this.props.title}</CardTitle>
                    {/* <CardSubtitle>Card subtitle</CardSubtitle> */}
                        <ListGroup>
                            {this.props.ideas.map((e)=>{
                                return <Idea key={e.id} description={e.description}/>
                            })}
                        </ListGroup>
                    {/* <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText> */}
                    <Button>Button</Button>
                    </CardBody>
                </Card>
            </div>
        )
    }
  }
export default Board