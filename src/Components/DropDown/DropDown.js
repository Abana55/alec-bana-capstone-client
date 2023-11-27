import './DropDown.scss';
import * as React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



function NavModal() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
        <Button variant="primary" onClick={handleShow}>
          Calculators
        </Button>
    
        <Modal className='modal__box' show={show} onHide={handleClose} animation={false}>
          <section className='modal__background'>  
          <Modal.Header className='modal__button' closeButton>
            <Modal.Title className='modal__title'>Summa</Modal.Title>
          </Modal.Header>
          <Modal.Body className='modal__'y>
            <button>Mortgage Calculator</button>
          </Modal.Body>
          <Modal.Footer className='modal__'>
            <Button className='modal__' variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button className='modal__' variant="primary" onClick={handleClose}>
              HomeLoans
            </Button>
          </Modal.Footer>
        </section>  
        </Modal>
    
      </>
    );
}


export default NavModal;