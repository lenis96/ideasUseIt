import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

import { Button ,Col,Modal,ModalBody,ModalHeader,ModalFooter,Form,FormGroup,Input,Label} from 'reactstrap';
import {getBoards,createBoard} from './../utils/api'

import Board from './Board'
class AppIdeas extends Component {
    // constructor(props){
    //     super(props)
    //     this.state= {
    //       redirectToReferrer: false
    //     };
    // }
    
    // login = () => {
    //   this.props.fakeAuth.authenticate(() => {
    //     this.setState({ redirectToReferrer: true });
    //   });
    // };
    
    // render() {
    //     console.log(this.state)
    //   const { from } = this.props.location.state || { from: { pathname: "/" } };
    //   const { redirectToReferrer } = this.state;
  
    //   if (redirectToReferrer) {
    //     return <Redirect to={from} />;
    //   }
  
    //   return (
    //     <div>
    //       <p>You must log in to view the page at {from.pathname}</p>
    //       <Button onClick={this.login}>Log in</Button>
    //     </div>
    //   );
    // }

    constructor(props){
        super(props)
        this.state={boards:[],modal:false,titleInput:''}
    }
    componentDidMount(){
        getBoards().then(res=>{
            this.setState({boards:res.data})
        })
    }

    toggle=()=> {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
      }
    createBoard=()=>{
        console.log("board Created:" +this.state.titleInput)
        if(this.state.titleInput!==''){
            createBoard({title:this.state.titleInput}).then(res=>{
                getBoards().then(res=>{ //TODO ver si no hacer otra vez la peticion
                    this.setState({boards:res.data,titleInput:''})
                })
                this.toggle()
            })
        }
        else{

        }
    }

    changeInputTitle=(event)=>{
        this.setState({titleInput:event.target.value})
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
                            <Col xs="4" className="mb-4">
                                <Board key={e.id} title={e.title}  ideas={e.ideas}/>
                            </Col>
                        )
                    })}


                </div>
                <div className="row">
                    <Button color="success" onClick={this.toggle}>
                        Create Board
                    </Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.toggle}>Create Board</ModalHeader>
                        <ModalBody>
                        <Form>
                           <FormGroup>
                            <Label for="title Board">Title</Label>
                            <Input type="text" onChange={this.changeInputTitle} value={this.state.titleInput} name="title" id="title Board" placeholder="Title" />
                            </FormGroup>
                        </Form>    
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.createBoard}>CreateBoard</Button>{' '}
                            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </div>
        )
    }
  }
export default AppIdeas