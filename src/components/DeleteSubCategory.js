
import React, { useState } from 'react'
import axios from "axios"
import {  Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {MdDeleteForever} from 'react-icons/md'
const DeleteSubCategory = (props) => {
    const {
        buttonLabel,
        className,
        subCategory,
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);


    
    const submitValue = async () => {

        alert(subCategory._id)
        axios.delete(`http://localhost:3000/subcategories/${subCategory._id}`).then(res => {
            if (res.status === 200) {

                alert("subCategory Deleted !")

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
                    You want to delete {subCategory.name} subcategory,<br />
                    All meals under this category will deleted permently !
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={submitValue}>Delete</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default DeleteSubCategory