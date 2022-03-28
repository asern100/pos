import React, { useState } from 'react'
import {  Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
const NoteModal = (props) => {
    const {
      buttonLabel,
      className,
      index,
      addNote,
    } = props;
  
    const [modal, setModal] = useState(false);
    const [note, setNote] = useState("")
    const toggle = () => setModal(!modal);
    const submitNote = () => {
      addNote(note, index)
      toggle()
    }
    return (
      <div>
        <Button size="sm" color="danger" onClick={toggle}>{buttonLabel}</Button>
        <Modal isOpen={modal} toggle={toggle} className={className}>
          <ModalHeader toggle={toggle}>Create Note</ModalHeader>
          <ModalBody>
            <Input type="textarea" name="text" id="exampleText" onChange={(e) => setNote(e.target.value)} />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={submitNote}>Submit</Button>{' '}
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  export default NoteModal