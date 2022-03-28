
import React, { useState } from 'react'

import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import './Ticket.css';

const Ticket = (props) => {
    const {
        order,
        total,
        orderNumber
    } = props;

    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);



    const handlePrint = () => {
        window.print();
        toggle()
    }



    return (
        <div>
            
            <Button style={{color:"black"}} onClick={toggle}>Ticket</Button>
            
            
            <Modal  isOpen={modal} toggle={toggle} >
                <div className='ticketHeader'>
                <ModalHeader toggle={toggle}>Ticket</ModalHeader>
                </div>
                <ModalBody>
                    
                <div className="ticket">
                <div className="ticket__information">
                <div className="cafe">
                    
                    
                    <h3 className="cafe__name">Zina Cafe</h3>
                    <p>123 Elm St</p>
                    <p>Manar I, TN</p>
                    <p className="cafe__number">216-28-161-030</p>
                    {new Date().toISOString()}
                    <p className="invoice__number">Invoice #{orderNumber}</p>
                </div> 
                             
                <div className="ticket__table">
                    <table>
                        <thead>
                            <tr>
                                <th className="items__description">Description</th>
                                <th className="items__qty">Qty</th>
                                <th className="items__price">Price</th>
                                
                            </tr>
                        </thead>   
                        <tbody>            
                        {order?.map((item, index) => (                            
                            <tr key={index}>
                                <td className="items__description">{item.name}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                            </tr>                            
                        ))}                                            
                        </tbody>                     
                    </table>
                </div>

                <div className="subtotal">
                    <hr/>   
                    <div className="subtotal__price">                                                      
                        Subtotal: ${total}
                    </div>                                     
                    <hr/>                    
                </div>

            </div>
            <div className="ticket__actions">
                <button onClick={() => handlePrint()}>💳</button>            
                
            </div>
        </div>
                    
                </ModalBody>
    
            </Modal>
        </div>
    );
}

export default Ticket