import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import { Button ,Col,Modal,ModalBody,ModalHeader,ModalFooter,Form,FormGroup,Input,Label} from 'reactstrap';
import {getBoards} from './../utils/api'

import Board from './Board'
import ModalCreateBoard from './ModalCreateBoard'
import ModalCreateIdea from './ModalCreateIdea'
import {IoMdAddCircle} from 'react-icons/io'
class AppIdeas extends Component {
    constructor(props){
        super(props)
        this.state={boards:[],searchInput:'',modalCreateBoard:false,titleInput:'',publicBoard:null,descriptionIdeaInput:'',boardId:null,modalCreateIdea:false}
    }
    componentDidMount(){
        this.updateBoards()
    }

    toggleModalCreateBoard=()=> {
        this.setState(prevState => ({
          modalCreateBoard: !prevState.modalCreateBoard
        }));
      }
    toggleModalCreateIdea=(idBoard,idIdea)=> {
        console.log(idIdea)
        this.setState(prevState => ({
          modalCreateIdea: !prevState.modalCreateIdea,
          boardId:idBoard,
          ideaId:idIdea
        }));
      }

    updateBoards=()=>{
        getBoards(this.state.searchInput).then(res=>{
            this.setState({boards:res.data})
        })
    }
    changeSearch=(event)=>{
        console.log(this.state)
        this.setState({searchInput:event.target.value},()=>{
            this.updateBoards()
        })

    }
    

    render(){
        const addBoardStyle={
            marginTop:'10px',
            float:'right'
        }
        const ColStyle={
            marginTop:'32px'
        }
        if(localStorage.getItem('token')==null) {
            return <Redirect to='/login'/>;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2>App Ideas</h2>
                        <Input onChange={this.changeSearch} value={this.state.searchInput} placeholder='Search Board'></Input>
                    </div>
                </div>
                <div className="row">
                   
                    {this.state.boards.map(e=>{
                        return (
                            <Col style={ColStyle} key={e.id} xs="6" className="mb-6">
                                <Board updateBoards={this.updateBoards} idBoard={e.id} toggleModalCreateIdea={this.toggleModalCreateIdea} {...e}/>
                            </Col>
                        )
                    })}


                </div>
                <div className="row">
                    <div className="col-12">
                    <Button style={addBoardStyle} color="link" onClick={this.toggleModalCreateBoard}>
                        <IoMdAddCircle color='green' size={52}/>
                    </Button>
                    <ModalCreateBoard toggle={this.toggleModalCreateBoard} modal={this.state.modalCreateBoard} updateBoards={this.updateBoards}/>
                    <ModalCreateIdea ideaId={this.state.ideaId} boardId={this.state.boardId} toggle={this.toggleModalCreateIdea} modal={this.state.modalCreateIdea} updateBoards={this.updateBoards}/>
                    </div>
                </div>
            </div>
        )
    }
  }
export default AppIdeas