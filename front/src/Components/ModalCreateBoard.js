import React, { Component } from 'react';
import {createBoard} from './../utils/api'

import { Button ,Modal,ModalBody,ModalHeader,ModalFooter,Form,FormGroup,Input,Label} from 'reactstrap';
class ModalCreateBoard extends Component{
    constructor(props){
        super(props)
        this.state={titleInput:'',publicBoard:false}
    }
    changePublicState=()=>{
        this.setState({publicBoard:!this.state.publicBoard})
    }

    createBoard=()=>{
        if(this.state.titleInput!==''){
            createBoard({title:this.state.titleInput,is_public:this.state.publicBoard}).then(res=>{
                this.setState({titleInput:'',publicBoard:false})
                this.props.updateBoards()
                this.props.toggle()
            })
        }
        else{

        }
    }
    changeInputTitle=(event)=>{
        this.setState({titleInput:event.target.value})
    }
    render(){
        let button
        if(this.state.publicBoard){
            button=<Button type="button" color="success" onClick={this.changePublicState}>Public</Button>
        }
        else{
            button=<Button type="button" color="primary" onClick={this.changePublicState}>Private</Button>

        }
        return(
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
    <ModalHeader toggle={this.props.toggle}>Create Board</ModalHeader>
    <ModalBody>
    <Form>
        <FormGroup>
        <Label for="title Board">Title</Label>
        <Input type="text" onChange={this.changeInputTitle} value={this.state.titleInput} name="title" id="title Board" placeholder="Title" />
        </FormGroup>
        <FormGroup>
        <Label for="title Board">Public</Label>
        {button}
        </FormGroup>
    </Form>    
    </ModalBody>
    <ModalFooter>
        <Button color="primary" type="button" onClick={this.createBoard}>CreateBoard</Button>{' '}
        <Button color="secondary" type="button" onClick={this.props.toggle}>Cancel</Button>
    </ModalFooter>
    </Modal>)
    }
}


export default ModalCreateBoard