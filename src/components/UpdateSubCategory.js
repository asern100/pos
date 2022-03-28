
import React, { useState } from 'react'
import axios from "axios"
import { Container, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {FaEdit} from 'react-icons/fa'
const UpdateSubCategory = (props) => {
    const {
        buttonLabel,
        className,
        subCategory,
    } = props;

    const [modal, setModal] = useState(false);
    const [values, setValues] = useState({});
    const toggle = () => setModal(!modal);


    const handleChange = event => {

        setValues({
            ...values,
            [event.target.name]: event.target.value,

        });
    }
    const submitValue = async () => {

        alert(subCategory._id)
        axios.put(`http://localhost:3000/subcategories/${subCategory._id}`, values).then(res => {
            if (res.status === 200) {

                alert("SubCategory updated !")

            }
        })
        toggle()
    }




    return (
        <div>
            <div onClick={toggle} style={{ position: "absolute" ,top :3, right:3, zIndex:222, color: "white", cursor:"pointer"}}  >
            <FaEdit  />
            </div>
            
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Update SubCategory</ModalHeader>
                <ModalBody>
                    <Container>
                        <Input type="text" name="name" onChange={(e) => handleChange(e)} placeholder={subCategory.name} />
                        <Input type="text" name="image" onChange={(e) => handleChange(e)} placeholder={subCategory.image} />
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={submitValue}>Submit</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default UpdateSubCategory