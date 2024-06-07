import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";
import Select from "react-select";
import { toast } from "react-toastify";
import { Button, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAppContext } from "../contextApi/AppContext";

const Suggestion = () => {
  const { logOutsap } = useAppContext();

  const { getARInvoice, arInvoiceList, postCompalint,postSuggestion } = useApi();

  const [returnAddress, setReturnAddress] = useState("");

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedItemCode, setSelectedItemCode] = useState("");
  const [messages, setMessage] = useState("");
  const [suggestions, setSuggestions] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      await getARInvoice();
    };
    fetchData();
  }, []);

  console.log(arInvoiceList, "list");

  const handleOrderIdChange = (selectedOption) => {
    setSelectedOrderId(selectedOption.value);
    const selectedInvoice = arInvoiceList.find(
      (invoice) => invoice.docNum === selectedOption.value
    );
    if (selectedInvoice && selectedInvoice.details.length > 0) {
      setSelectedItemCode(selectedInvoice.details[0].itemCode);
    } else {
      setSelectedItemCode("");
    }
  };

  const orderOptions = arInvoiceList.map((invoice) => ({
    value: invoice.docNum,
    label: invoice.docNum,
  }));

  const handleSuggestionsubmit = () => {
    postSuggestion({suggestions})
  }

  const handleSubmit = () => {
    // console.log("Selected Order Id:", selectedOrderId);
    // console.log("Auto Populated Item Code:", selectedItemCode);
    // console.log("Message:", message);
    postCompalint({ selectedOrderId, selectedItemCode, messages });
  };


 


  return (
    <div className="h-100 container">
      <Row>
        <Col sm={3}>
          <div className="list-group mt-2">
            <Link
              to="/account/profile"
              className={` list-group-item list-group-item-action`}
            >
              Profile
            </Link>
            <Link
              to="/account/orders"
              className={` list-group-item list-group-item-action`}
            >
              Orders
            </Link>
            <Link
              to="/account/details"
              className={` list-group-item list-group-item-action`}
            >
              Account
            </Link>
            <Link
              to="/account/address"
              className={` list-group-item list-group-item-action`}
            >
              Address
            </Link>
            <Link
              to="/account/return"
              className={` list-group-item list-group-item-action`}
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
              to="/account/changePassord"
              className={` list-group-item list-group-item-action`}
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
          <section className="bg-light py-2">
            <div className="container mt-4 mt-md-0 mt-lg-0">
              <div className="row">
                <div className="col-lg-12">
                  <div className="card border shadow-0">
                    <div className="m-4">
                      <h4 className="card-title mb-4 mt-4 mt-md-0 mt-lg-0 text text-bg-primary p-3 text-center">
                        Suggestion
                      </h4>

                      <div>
                        {arInvoiceList?.length === 0 ? (
                          <p>No Documents found</p>
                        ) : (
                          <>
                            <div>
                              <div className="row justify-content-between align-items-center mb-3">
                                <div className="col-md-12">
                                  <label>
                                    <b>Suggestion Box:</b>
                                  </label>
                                  <textarea
                                    type="text"
                                    placeholder="type your suggestion here"
                                    value={suggestions}
                                    onChange={(e) =>
                                      setSuggestions(e.target.value)
                                    }
                                    className="form-control custom-textarea mt-2"
                                  />
                                </div>
                              </div>
                              <Button
                                className="btn btn-success mb-2"
                                onClick={handleSuggestionsubmit}
                              >
                                Submit
                              </Button>
                            </div>
                            <div className="">
                              <h4 className="card-title mb-4 mt-4 mt-md-0 mt-lg-0 text text-bg-primary p-3 text-center">
                                Complaint
                              </h4>
                              <Table
                                striped
                                bordered
                                hover
                               
                              >
                                <thead>
                                  <tr>
                                    <th>Order Id</th>
                                    <th>Item Code</th>
                                    <th> Complaint Box </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                      <Select
                                        options={orderOptions}
                                        onChange={handleOrderIdChange}
                                      />
                                    </td>
                                    <td>{selectedItemCode}</td>
                                    <td>
                                      <textarea
                                        className="form-control"
                                        placeholder="Enter your Complaint here"
                                        value={messages}
                                        onChange={(e) =>
                                          setMessage(e.target.value)
                                        }
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </div>
                          </>
                        )}
                      </div>
                      <Button
                        className="btn btn-success"
                        onClick={handleSubmit}
                      >
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default Suggestion;
