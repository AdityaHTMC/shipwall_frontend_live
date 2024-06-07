import React, { useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAppContext } from "../../../contextApi/AppContext";

const ChangePassword = () => {
  const { ChangePassword, logOutsap } = useAppContext();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  //   const cardCode = localStorage.getItem("username9");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    }
    setError(""); // Clear error when user starts typing
  };

  const handleClick = () => {
    if (newPassword === confirmPassword) {
      ChangePassword(newPassword);
    } else {
      setError("Passwords do not match");
    }
  };

  return (
    <div className="h-100 container pb-4">
      <Row>
        <Col sm={3}>
          <div className="list-group mt-4">
            <Link
              to="/account/profile"
              className={`list-group-item list-group-item-action`}
            >
              Profile
            </Link>
            <Link
              to="/account/orders"
              className={`list-group-item list-group-item-action`}
            >
              Orders
            </Link>
            <Link
              to="/account/details"
              className={`list-group-item list-group-item-action`}
            >
              Account
            </Link>
            <Link
              to="/account/address"
              className={`list-group-item list-group-item-action`}
            >
              Address
            </Link>
            <Link
              to="/account/return"
              className={`list-group-item list-group-item-action`}
            >
              Return
            </Link>
            <Link
              to="/account/suggestion"
              className={` list-group-item list-group-item-action`}
            >
              Suggestion
            </Link>
            <Link
              to="/account/changePassword"
              className={`list-group-item list-group-item-action`}
            >
              Change password
            </Link>
            <Link
              onClick={logOutsap}
              className={` list-group-item list-group-item-action`}
            >
              Sign Out
            </Link>
          </div>
        </Col>
        <Col sm={9}>
          <div className="mt-4">
            <h2>Change Password</h2>
            <Form>
              <Form.Group controlId="formNewPassword" className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                  placeholder="Enter New Password"
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mb-3">
                <Form.Label>Confirm New Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm New Password"
                />
              </Form.Group>
              {error && <div className="text-danger mb-3">{error}</div>}
              <Button variant="primary" onClick={handleClick}>
                Change Password
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePassword;
