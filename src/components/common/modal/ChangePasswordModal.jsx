import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert'; // Import Bootstrap Alert
import { useAppContext } from '../../../contextApi/AppContext';


const ChnagePasswordModal = ({ show, onHide }) => {
  const { ChangePassword } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation for email and password
    if (!email || !password) {
      setShowAlert(true);
      return;
    }

    try {
      localStorage.setItem("username9" , email)
      ChangePassword( email, password );
      onHide();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="bg-primary">
          <Modal.Title id="contained-modal-title-vcenter" className="text text-light">
            Change PassWord
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Bootstrap Alert for Validation */}
          {showAlert && (
            <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
              Please enter both UserName and New password.
            </Alert>
          )}

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>UserName</Form.Label>
              <Form.Control
                type="text"
                placeholder="UserName"
                autoFocus
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="password"
                autoFocus
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Modal.Footer>
              <Button type="submit" className="mx-auto" onClick={handleSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChnagePasswordModal;
