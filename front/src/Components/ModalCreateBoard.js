import React, { Component } from 'react';

import { Button ,Modal,ModalBody,ModalHeader,ModalFooter,Form,FormGroup,Input,Label} from 'reactstrap';
const ModalCreateBoard=(props)=> (
    <Modal isOpen={props.modal} toggle={props.toggle} className={props.className}>
        <ModalHeader toggle={props.toggle}>Create Board</ModalHeader>
        <ModalBody>
        <Form>
            <FormGroup>
            <Label for="title Board">Title</Label>
            <Input type="text" onChange={props.changeInputTitle} value={props.titleInput} name="title" id="title Board" placeholder="Title" />
            </FormGroup>
        </Form>    
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={props.createBoard}>CreateBoard</Button>{' '}
            <Button color="secondary" onClick={props.toggle}>Cancel</Button>
        </ModalFooter>
    </Modal>
)

export default ModalCreateBoard