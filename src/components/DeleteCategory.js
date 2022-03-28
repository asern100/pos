
import React, { useState } from 'react'
import axios from "axios"
import { Container, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {MdDeleteForever} from 'react-icons/md'
const DeleteCategory = (props) => {
    const {
        buttonLabel,
        className,
        category,
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    
    const submitValue = async () => {

        alert(category._id)
        axios.delete(`http://localhost:3000/categories/${category._id}`).then(res => {
            if (res.status === 200) {

                alert("Category Deleted !")

            }
        })
        toggle()
    }




    return (
        <div>
            <div onClick={toggle} style={{ position: "absolute" ,top :3, right:25, zIndex:222, color: "red", cursor:"pointer"}}  >
            <MdDeleteForever  />
            </div>
            
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Are you sure</ModalHeader>
                <ModalBody>
                    You want to delete {category.name} category,<br />
                    All subcategories & meals under this category will deleted permently !
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={submitValue}>Delete</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DeleteCategory