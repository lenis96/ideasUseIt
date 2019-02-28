import React, { Component } from 'react';

import { Button ,Modal,ModalBody,ModalHeader,ModalFooter,Form,FormGroup,Input,Label} from 'reactstrap';
import {createIdea,updateIdea,getIdea} from './../utils/api'

class ModalCreateIdea extends Component{
    constructor(props){
        super(props)
        this.state={descriptionIdeaInput:'',approvedInput:true}
    }
    componentDidMount(){
    }
    componentWillUpdate(){
    }
    updateInformation(){
        //TODO aqui continuar
        if(this.props.ideaId){
            getIdea(this.props.ideaId).then((res)=>{
                this.setState({descriptionIdeaInput:res.data.description,approvedInput:res.data.approved})
            })
        }
        
    }

    changeApprovedState=()=>{
        this.setState({approvedInput:!this.state.approvedInput})
    }
    createIdea=()=>{
        console.log(this.props.boardId)
        console.log(this.props.ideaId)
        if(this.state.descriptionIdeaInput!==''){
            if(this.props.ideaId){
                console.log({id:this.props.ideaId,description:this.state.descriptionIdeaInput,board:this.props.boardId,approved:this.state.approvedInput})
                updateIdea(this.props.ideaId,{description:this.state.descriptionIdeaInput,board:this.props.boardId,approved:this.state.approvedInput}).then(res=>{
                    this.setState({descriptionIdeaInput:'',boardId:null})
                    this.props.updateBoards()
                    this.props.toggle()
                })
            }
            else{
                createIdea({description:this.state.descriptionIdeaInput,board:this.props.boardId}).then(res=>{
                    this.setState({descriptionIdeaInput:'',boardId:null})
                    this.props.updateBoards()
                    this.props.toggle()
                })
            }
        }
    }

    changeInputDescriptionIdea=(event)=>{
        this.setState({descriptionIdeaInput:event.target.value})
    }
    render(){
        let button
        if(this.props.ideaId){

            if(this.state.approvedInput){
                button=<Button type="button" color="success" onClick={this.changeApprovedState}>Approved</Button>
            }
            else{
                button=<Button type="button" color="warning" onClick={this.changeApprovedState}>Not Approved</Button>
                
            }
        }
        return(

            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}>
        <ModalHeader toggle={this.props.toggle}>{!this.props.ideaId?'Create Idea':'Update Idea'}</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup>
            <Label for="title Board">Idea</Label>
            <Input type="text" onChange={this.changeInputDescriptionIdea} value={this.state.descriptionIdeaInput} name="idea"  placeholder="Idea" />
            </FormGroup>
            <FormGroup>
            <Label for="title Board">Approved</Label>
            {button}
            </FormGroup>
        </Form>    
        </ModalBody>
        <ModalFooter>
            <Button type="button" color="primary" onClick={this.createIdea}>{!this.props.ideaId?'Create Idea':'Update Idea'}</Button>{' '}
            <Button type="button" color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
            )
    }
}

export default ModalCreateIdea