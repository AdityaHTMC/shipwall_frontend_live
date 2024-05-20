import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useAppContext } from "../../../contextApi/AppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MyComponent from "../../../screen/payment/CardPayment";

const PaymentModal = ({ amount, onHide, show, mode,selectedPaymentMethod,selectedShippingMethod,selectedAddress, singleProduct, productQuantity , cartItem , cashOnDelivery,freeCreditLimit,selectedItem,manualAddress,note}) => {
  const [loading, SetLoading] = useState(false);
  const { order, SalseOrderPlace, EmptyCart } = useAppContext();
  const navigate = useNavigate();


  const handlePay = async (e) => {
    SetLoading(true);
  
    try {
      // await order(selectedShippingMethod, selectedPaymentMethod, selectedAddress , amount);
      SalseOrderPlace(selectedItem,manualAddress,note)
    } catch (error) {
      console.log("Payment failed");
    } finally {
      SetLoading(false);
    }
  };
  

  if (mode === "Bank Transfer") {
    return (
      <Modal show={show} onHide={onHide} centered>
        <Modal.Header className="text-bg-info" closeButton>
          <Modal.Title className="text text-center p-3">
            Payment Details
          </Modal.Title>
        </Modal.Header>
        {loading ? (
          <>
            <Modal.Body
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px",
              }}
            >
              <div style={{ width: "4rem", height: "4rem" }}>
                <div
                  class="spinner-border text-primary"
                  role="status"
                  style={{ width: "3rem", height: "3rem" }}
                >
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </Modal.Body>
          </>
        ) : (
          <Modal.Body>
            <div className="">
              <Form>
                <p className="text text-center text-bg-warning ">
                  Amount to pay {amount}
                </p>
                <Form.Group controlId="cardNumber">
                  <Form.Label>Account Number</Form.Label>
                  <div className="d-flex align-items-center">
                    <Form.Control
                      type="number"
                      placeholder="1234 5678 9012 3456"
                      minLength={19}
                      maxLength={19}
                    />
                    {/* <img
                src="https://img.icons8.com/color/48/000000/visa.png"
                alt="Visa"
                width="48px"
                className="ml-3"
              /> */}
                  </div>
                </Form.Group>

                <Form.Group controlId="cardholderName">
                  <Form.Label>Account Holder Name</Form.Label>
                  <Form.Control type="text" placeholder="John Doe" />
                </Form.Group>

                <Form.Group controlId="expiration">
                  <Form.Label>IFSC Code</Form.Label>
                  <Form.Control type="text" placeholder="CNRB0005789" />
                </Form.Group>
              </Form>
            </div>
          </Modal.Body>
        )}
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePay}>
            {loading ? "Paying..." : "Pay"}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }



  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header className="text-bg-info" closeButton>
        <Modal.Title className="text text-center p-3">
          Payment Details
          
        </Modal.Title>
      </Modal.Header>
      {loading ? (
        <>
          <Modal.Body
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div style={{ width: "4rem", height: "4rem" }}>
                <div
                  class="spinner-border text-primary"
                  role="status"
                  style={{ width: "3rem", height: "3rem" }}
                >
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            </Modal.Body>
        </>
      ) : (
        <Modal.Body>
          <p className="text text-center text-bg-warning ">
                 Amount to pay {amount.toFixed(2)}
              </p>
          <MyComponent amount={amount} selectedItem={selectedItem} cashOnDelivery={cashOnDelivery} freeCreditLimit={freeCreditLimit}/>
        </Modal.Body>
      )}
      {/* <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handlePay}>
          {loading ? "Paying..." : "Pay"}
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default PaymentModal;
