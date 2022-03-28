
import React, { useState } from 'react'
import {  Input, Button, Modal,Row, Label,Container, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const TacosModal = (props) => {
  const {
    buttonLabel,
    className,
    index,
    tacos,
    addTacos,
  } = props;

  const [modal, setModal] = useState(false);
  const [tacoSelected, setTacoSelected] = useState([])
  const toggle = () => setModal(!modal);
  const submitNote = () => {
    addTacos(tacoSelected, index)
    toggle()
  }
  const handleChange = (checked, value) => {
    if (checked) {
      setTacoSelected([...tacoSelected, value])
    } else {
      tacoSelected.pop(value)
    }

  }
  return (
    <div>
      <Button size="sm" color="primary" onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>ADD TACOS</ModalHeader>
        <ModalBody>
          <Container>
            {tacos.map(t =>
              <Row style={{ fontFamily: 'Lobster' }}>
                <Label check>
                  <Input type="checkbox" id="checkbox2" onChange={(v) => handleChange(v.target.checked, t.name)} />{' '}
                  {t.name}
                </Label>
              </Row>)}
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitNote}>Submit</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

  export default TacosModal

