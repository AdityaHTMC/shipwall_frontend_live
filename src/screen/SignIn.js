import React, { useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useAppContext } from "../contextApi/AppContext";
import { Link, useNavigate } from "react-router-dom";

const SignIn = ({ show, onHide }) => {
  const { loginUser, LoginUser, base_url, base_url2 } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cardCode, setCardCode] = useState("");
  const [otp, setOtp] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showCardCode, setShowCardCode] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [eMail, setEMail] = useState("");
  const token = localStorage.getItem("accessC9");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setAlertMessage("Please enter both UserName and password.");
      setShowAlert(true);
      return;
    }

    try {
      localStorage.setItem("username9", email);
      LoginUser(email, password);
      onHide();
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!cardCode) {
      setAlertMessage("Please enter your CardCode.");
      setShowAlert(true);
      return;
    }

    try {
      const response = await axios.get(
        `https://shipwall.au/WCF_API_HTTPS_LIVE/api/Masters/GetBP/${cardCode}/C/%20/%20`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data[0].e_Mail && response.data[0].e_Mail) {
        setEMail(response.data[0].e_Mail);
        setShowOtp(true);

        // Send email using the second API
        await axios.post("https://shipwall.au/API/shipwall/api/v1/send/otp", {
          cardCode: cardCode,
          E_Mail: response.data[0].e_Mail,
        });
      } else {
        setAlertMessage("Email not found for the given UserName.");
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("Error retrieving email for the given UserName.");
      setShowAlert(true);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setAlertMessage('Please enter the OTP.');
      setShowAlert(true);
      return;
    }

    try {
      const response = await axios.post(
        'https://shipwall.au/API/shipwall/api/v1/verify/otp',
        { otp },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: token,
          },
        }
      );

      if (response.data && response.data.success) {
        console.log('OTP verified successfully.');
        // After successful OTP verification, reset states and close modal
        setShowOtp(false);
        setShowCardCode(false);
        setCardCode('');
        setOtp('');
        onHide();
      } else {
        setAlertMessage('Invalid OTP. Please try again.');
        setShowAlert(true);
      }
    } catch (error) {
      console.log(error);
      setAlertMessage('Error verifying OTP. Please try again.');
      setShowAlert(true);
    }
  };

  const navigate = useNavigate()
  const handleNewRegistration = () => {
    onHide();
    navigate('/contact-us');
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
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-light"
          >
            Please Sign In
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showAlert && (
            <Alert
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {alertMessage}
            </Alert>
          )}

          {!showCardCode && !showOtp ? (
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput2"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Modal.Footer>
                <Button type="submit" className="mx-auto">
                  Submit
                </Button>
              </Modal.Footer>
            </Form>
          ) : showCardCode && !showOtp ? (
            <Form onSubmit={handleResetPassword}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput3"
              >
                <Form.Label>UserName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your CardCode"
                  value={cardCode}
                  onChange={(e) => setCardCode(e.target.value)}
                />
              </Form.Group>
              <Modal.Footer>
                <Button type="submit" className="mx-auto">
                  Reset Password
                </Button>
              </Modal.Footer>
            </Form>
          ) : showOtp ? (
            <Form onSubmit={handleOtpSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput4"
              >
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </Form.Group>
              <Modal.Footer>
                <Button type="submit" className="mx-auto">
                  Submit OTP
                </Button>
              </Modal.Footer>
            </Form>
          ) : null}

          {!showOtp && (
            <div className="text-center mt-3">
              <Button
                variant="link"
                onClick={() => setShowCardCode(!showCardCode)}
              >
                {showCardCode ? "Cancel" : "Forget Password?"}
              </Button>
              <br/>
              {!showCardCode ? <Button variant="link" onClick={handleNewRegistration}>New Registration</Button> : '' }
              
            </div>
          )}
          
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignIn;
