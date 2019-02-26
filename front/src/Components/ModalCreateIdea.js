import React, { Component } from 'react';

import { Button ,Modal,ModalBody,ModalHeader,ModalFooter,Form,FormGroup,Input,Label} from 'reactstrap';
const ModalCreateBoard=(props)=> (
    <Modal isOpen={props.modal} toggle={props.toggle} className={props.className}>
        <ModalHeader toggle={props.toggle}>Create Idea</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup>
            <Label for="title Board">Idea</Label>
            <Input type="text" onChange={props.changeInputDescriptionIdea} value={props.descriptionIdeaInput} name="idea"  placeholder="Idea" />
            </FormGroup>
        </Form>    
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={props.createIdea}>Create Idea</Button>{' '}
            <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
)

export default ModalCreateBoard