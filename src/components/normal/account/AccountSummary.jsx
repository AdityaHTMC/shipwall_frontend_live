import React, { useState, useEffect } from "react";
import "./ManageAddress.css";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";
import { IoMdDownload } from "react-icons/io";
import PdfTable from "./PdfTable";

const AccountSummary = () => {
  const { Adddata } = useApi();
  const [loading, setLoading] = useState(true);
  const [pdfOpen, setPdfOpen] = useState(false);

  const freecredit = Adddata?.creditlimit - Adddata?.balance - Adddata?.soOpenAmount
 
  const displayFreeCredit = freecredit < 0 ? 0 : freecredit;
 

  useEffect(() => {
    // Assuming Adddata is the API response and you want to check if it exists
    if (Adddata) {
      setLoading(false); // Set loading to false once data is available
    }
  }, [Adddata]);

  return (
    <div className="account-summary">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="row">
          <div className="col-md-4">
            <div className="acc-box"> <span>Credit Limit  </span>  <br/> {Adddata?.creditlimit}</div>
          </div>
          <div className="col-md-4">
            <div className="acc-box"> <span>Payment Term</span> <br/> {Adddata?.topname}</div>
          </div>
          <div className="col-md-4">
            <div className="acc-box"> <span>Ledger Balance</span> <br/> {Adddata?.balance.toFixed(2)} </div>
          </div>
          <div className="col-md-4">
            <div className="acc-box"> <span>Open Sales Order </span> <br/> {Adddata?.soOpenAmount.toFixed(2)} </div>
          </div>
          <div className="col-md-4">
            <div className="acc-box"> <span>Free Credit Limit </span> <br/> 
              {displayFreeCredit.toFixed(2)}
             </div>
          </div>
          <div className="col-md-4">
            <div className="acc-box"> <span>Ledger Download </span> <br/> 
              <button className="text text-success" onClick={() => setPdfOpen(true)} ><IoMdDownload /></button>
             </div>
          </div>
        </div>
      )}
      {pdfOpen === true && (
        <PdfTable onClose={setPdfOpen} />
      )}
    </div>
  );
};

export default AccountSummary;