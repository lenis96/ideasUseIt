import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import { Button ,Col,Modal,ModalBody,ModalHeader,ModalFooter,Form,FormGroup,Input,Label} from 'reactstrap';
import {getBoards,createBoard,createIdea} from './../utils/api'

import Board from './Board'
import ModalCreateBoard from './ModalCreateBoard'
import ModalCreateIdea from './ModalCreateIdea'
class AppIdeas extends Component {
    constructor(props){
        super(props)
        this.state={boards:[],modalCreateBoard:false,titleInput:'',descriptionIdeaInput:'',boardId:null,modalCreateIdea:false}
    }
    componentDidMount(){
        this.updateBoards()
    }

    toggleModalCreateBoard=()=> {
        console.log('lel')
        this.setState(prevState => ({
          modalCreateBoard: !prevState.modalCreateBoard
        }));
      }
    toggleModalCreateIdea=(idBoard)=> {
        this.setState(prevState => ({
          modalCreateIdea: !prevState.modalCreateIdea,
          boardId:idBoard
        }));
      }

    updateBoards=()=>{
        getBoards().then(res=>{
            this.setState({boards:res.data})
        })
    }
    createBoard=()=>{
        if(this.state.titleInput!==''){
            createBoard({title:this.state.titleInput}).then(res=>{
                this.setState({titleInput:''})
                this.updateBoards()
                this.toggleModalCreateBoard()
            })
        }
        else{

        }
    }

    createIdea=()=>{
        if(this.state.descriptionIdeaInput!==''){
            createIdea({description:this.state.descriptionIdeaInput,board:this.state.boardId}).then(res=>{
                this.setState({descriptionIdeaInput:'',boardId:null})
                this.updateBoards()
                this.toggleModalCreateIdea()
            })
        }
    }

    changeInputTitle=(event)=>{
        this.setState({titleInput:event.target.value})
    }
    changeInputDescriptionIdea=(event)=>{
        this.setState({descriptionIdeaInput:event.target.value})
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>App Ideas</h2>
                    </div>
                </div>
                <div className="row">
                   
                    {this.state.boards.map(e=>{
                        return (
                            <Col key={e.id} xs="4" className="mb-4">
                                <Board updateBoards={this.updateBoards} idBoard={e.id} toggleModalCreateIdea={this.toggleModalCreateIdea} title={e.title}  ideas={e.ideas}/>
                            </Col>
                        )
                    })}


                </div>
                <div className="row">
                    <Button color="success" onClick={this.toggleModalCreateBoard}>
                        Create Board
                    </Button>
                    <ModalCreateBoard toggle={this.toggleModalCreateBoard} modal={this.state.modalCreateBoard} createBoard={this.createBoard} titleInput={this.state.titleInput} changeInputTitle={this.changeInputTitle}/>
                    <ModalCreateIdea toggle={this.toggleModalCreateIdea} modal={this.state.modalCreateIdea} createIdea={this.createIdea} descriptionIdeaInput={this.state.descriptionIdeaInput} changeInputDescriptionIdea={this.changeInputDescriptionIdea}/>
                </div>
            </div>
        )
    }
  }
export default AppIdeas