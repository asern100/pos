
import React, { useState,useEffect } from 'react'
import axios from "axios"
import { Container, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { HiViewGridAdd } from "react-icons/hi"

const AddMeal = (props) => {
    const {
        buttonLabel,
        className,
    } = props;

    const [modal, setModal] = useState(false);
    const [values, setValues] = useState({});
    const toggle = () => setModal(!modal);

    const [categories,setCategories] = useState([]);
    const [subcategories,setSubCategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/categories/").then(response => {
             setCategories(response.data)   
        })
        axios.get("http://localhost:3000/subcategories/").then(response => {
             setSubCategories(response.data)   
        })
    }, [])

    const handleChange = event => {

        setValues({
            ...values,
            [event.target.name]: event.target.value,

        });
    }

    const submitValue = async () => {

        alert(JSON.stringify(values))
        axios.post('http://localhost:3000/meals/', values).then(res => {
            if (res.status === 200) {

                alert("meal added !")

            }
        })
        toggle()
    }




    return (
        <div>
            <div style={{color:"blue", textAlign:"right" , width:"100%"}}>
            <HiViewGridAdd onClick={toggle}  />
            </div>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>ADD Meal</ModalHeader>
                <ModalBody>
                    <Container>
                        <Input className="" name="categoryID" type="select" onChange={(e) => handleChange(e)} >
                            <option value={""}>choose</option>
                            {categories.map(Category =>

                                <>

                                    <option value={Category._id}>{Category.name}</option>

                                </>
                            )}
                        </Input>
                        <br />
                        <Input className="" name="subCategoryID" type="select" onChange={(e) => handleChange(e)} >
                            <option value={""}>choose</option>
                            {
                                (values.categoryID) ? subcategories.map(subCategory =>

                                    <>
    
                                        <option value={subCategory._id}>{subCategory.name}</option>
    
                                    </>
                                ) : null
                            }
                        </Input>
                        <br />
                        <Input type="text" name="name" onChange={(e) => handleChange(e)} />
                        <br />
                        <Input type="text" name="image" onChange={(e) => handleChange(e)} />
                        <Input type="number" name="price" onChange={(e) => handleChange(e)} />
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

export default AddMeal