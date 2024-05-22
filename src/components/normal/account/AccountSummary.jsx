import React, { useState, useEffect } from "react";
import "./ManageAddress.css";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";
import { IoMdDownload } from "react-icons/io";
import PdfTable from "./PdfTable";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AccountSummary = () => {
  const { Adddata,getBP } = useApi();
  const [loading, setLoading] = useState(true);
  const [pdfOpen, setPdfOpen] = useState(false);

  const freecredit =
    Adddata?.creditlimit - Adddata?.balance - Adddata?.soOpenAmount;

  const displayFreeCredit = freecredit < 0 ? 0 : freecredit;

  useEffect(() => {
    getBP()
  },[])

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
          </div>
        </Col>
        <Col sm={9}>
          <div className="account-summary">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="row">
                <div className="col-md-12">
                <div className="card border shadow-0">
                <div className="card-header">
                  <h4 className="card-title mb-4 mt-4 mt-md-0 mt-lg-0 text text-bg-primary p-3 text-center">Acccount Summary</h4>
                </div>
                <div className="row p-4">

                <div className="col-md-4">
                  <div className="acc-box">
                    {" "}
                    <span>Credit Limit </span> <br /> {Adddata?.creditlimit}
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
                  <div className="acc-box">
                    {" "}
                    <span>Ledger Download </span> <br />
                    <button
                      className="text text-success"
                      onClick={() => setPdfOpen(true)}
                    >
                      <IoMdDownload />
                    </button>
                  </div>
                </div>
                </div>
              
                </div>
                </div>

   
              </div>
            )}
            {pdfOpen === true && <PdfTable onClose={setPdfOpen} />}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AccountSummary;
