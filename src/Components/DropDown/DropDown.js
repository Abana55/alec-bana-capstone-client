import "./DropDown.scss";
import * as React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { NavLink, useLocation } from 'react-router-dom';
import HomeLoans from "../HomeLoans/HomeLoans";
import autoLoans from "../../pages/autoLoans/autoloans";


function NavModal() {
  const [show, setShow] = useState(false);
  const location = useLocation();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Calculators
      </Button>

      <Modal
        className="modal__box"
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <section className="modal__background">
          <Modal.Header className="modal__button" closeButton>
            <Modal.Title className="modal__title">Summa</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal__">
            <button className="modal__button">Mortgage Calculator</button>
            <button>
            <NavLink
                to="/Homeloans"
                className={`${HomeLoans() ? "active" : ""}`}
              >
                Mortgage Loans
              </NavLink>
              </button>
              <NavLink
                to="/autoLoans"
                className={`${autoLoans() ? "active" : ""}`}
              >
                Auto Loans
              </NavLink>
          </Modal.Body>
          <Modal.Footer className="modal__">
            <Button
              className="modal__button"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              className="modal__button"
              variant="primary"
              onClick={handleClose}
            >
            </Button>
          </Modal.Footer>
        </section>
      </Modal>
    </>
  );
}

export default NavModal;
