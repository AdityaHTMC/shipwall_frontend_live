import React, { useState, useEffect, useRef } from "react";
import "./ManageAddress.css";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";
import { IoMdDownload } from "react-icons/io";
import PdfTable from "./PdfTable";
import { Col, Row, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays,format  } from "date-fns";

const AccountSummary = () => {
  const { Adddata, getBP } = useApi();
  const [loading, setLoading] = useState(true);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [formattedDates, setFormattedDates] = useState({ startDate: '', endDate: '' });

  const btnref = useRef()

  const freecredit =
    Adddata?.creditlimit - Adddata?.balance - Adddata?.soOpenAmount;

  const displayFreeCredit = freecredit < 0 ? 0 : freecredit;

  useEffect(() => {
    getBP();
  }, []);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleDateChange = (item) => {
    setState([item.selection]);
    const startDateFormatted = format(item.selection.startDate, "yyyyMMdd");
    const endDateFormatted = format(item.selection.endDate, "yyyyMMdd");
    console.log(`start_date: ${startDateFormatted} end_date: ${endDateFormatted}`);
  };

  const handleSaveChanges = () => {
    const startDateFormatted = format(state[0].startDate, "yyyyMMdd");
    const endDateFormatted = format(state[0].endDate, "yyyyMMdd");
    console.log(`start_date: ${startDateFormatted} end_date: ${endDateFormatted}`);
    setFormattedDates({ startDate: startDateFormatted, endDate: endDateFormatted });
    setModalShow(false);
    btnref.current?.click()
  };

  useEffect(() => {
    // Assuming Adddata is the API response and you want to check if it exists
    if (Adddata) {
      setLoading(false); // Set loading to false once data is available
    }
  }, [Adddata]);

  return (
    <div className="h-100 container">
      <Row>
        <Col sm={3}>
          <div className="list-group mt-4">
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
              to="/account/changePassord"
              className={` list-group-item list-group-item-action`}
            >
              Change password
            </Link>
          </div>
        </Col>
        <Col sm={9}>
          <div className="account-summary pt-0 mt-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="card border shadow-0">
                    <div className="card-header">
                      <h4 className="card-title mt-md-0 mt-lg-0 text text-bg-primary p-3 text-center">Account Summary</h4>
                    </div>
                    
                    
                    <div className="row p-4">
                      <div className="col-md-4">
                        <div className="acc-box">
                          {" "}
                          <span>Credit Limit </span> <br />{" "}
                          {Adddata?.creditlimit}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="acc-box">
                          {" "}
                          <span>Payment Term</span> <br /> {Adddata?.topname}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="acc-box">
                          {" "}
                          <span>Ledger Balance</span> <br />{" "}
                          {Adddata?.balance.toFixed(2)}{" "}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="acc-box">
                          {" "}
                          <span>Open Sales Order </span> <br />{" "}
                          {Adddata?.soOpenAmount.toFixed(2)}{" "}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="acc-box">
                          {" "}
                          <span>Free Credit Limit </span> <br />
                          {displayFreeCredit.toFixed(2)}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="acc-box p-3">
                        <div className="mb-2">Ledger Download </div>
                        <button className="btn btn-primary btn-block btn-sm" onClick={() => setModalShow(true)}>Select Date Range</button>&nbsp;
                          <button ref={btnref}
                            className="btn btn-success btn-sm"
                            onClick={() => setPdfOpen(true)}
                          >
                            <IoMdDownload />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
            )}
           {pdfOpen && (
              <PdfTable onClose={setPdfOpen} startDate={formattedDates.startDate} endDate={formattedDates.endDate} />
            )}
          </div>
        </Col>
      </Row>
      <Modal
        show={modalShow}
        size="xl"
        onHide={() => setModalShow(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Date Range</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DateRangePicker
            onChange={handleDateChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AccountSummary;
