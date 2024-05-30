import React, { Fragment, useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";
import { toast } from "react-toastify";

const PdfTable = ({ onClose, startDate, endDate, code, token }) => {
  const { ledgerData, dowloadLedger } = useApi();
  const [pdfData, setPdfData] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [totalCredit, setTotalCredit] = useState(null);
  const [totalDebit, setTotalDebit] = useState(null);

  useEffect(() => {
    if(code && token){
      dowloadLedger({ startDate, endDate, code, token });
    }else{
      dowloadLedger({ startDate, endDate });
    }
  }, [startDate, endDate, code, token]);

  console.log(ledgerData, "ledger data");

  const convertPdf = async () => {
    try {
      setIsConverting(true);
      const canvasArray = [];
      const pages = document.querySelectorAll(".pdf-page");

      for (let i = 0; i < pages.length; i++) {
        pages[i].style.width = `${pages[i].scrollWidth}px`;
        pages[i].style.overflow = "auto";
        const canvas = await html2canvas(pages[i], {
          allowTainted: true,
          useCORS: true,
        });
        pages[i].style.width = "auto";
        canvasArray.push(canvas);
      }

      const pdf = new jsPDF();
      canvasArray.forEach((canvas, index) => {
        if (index !== 0) {
          pdf.addPage();
        }
        const imgData = canvas.toDataURL("image/webp", 1);
        const imgWidth = 210; // Adjust as needed
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "WEBP", 0, 0, imgWidth, imgHeight);
      });

      const pdfData = pdf.output("datauristring");
      if (!!pdfData) {
        if(code && token){
          window?.ReactNativeWebView?.postMessage(JSON.stringify({ success: true, message: "Ladger downloaded successfully", data: pdfData }));
        }else{
          setPdfData(pdfData);
          const link = document.createElement("a");
          link.href = pdfData;
          link.download = `${ledgerData[0].data[0].cardName}-${ledgerData[0].data[0].cardCode}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        toast.error("cound not converted ladger into PDF file");
        if(code && token){
          window?.ReactNativeWebView?.postMessage(JSON.stringify({ success: false, message: "cound not converted ladger into PDF file" }));
        }
      }
    } catch (error) {
      toast.error("something went wrong");
      if(code && token){
        window?.ReactNativeWebView?.postMessage(JSON.stringify({ success: false, message: "something went wrong" }));
      }
    } finally {
      onClose(false);
      setIsConverting(false);
    }
  };

  useEffect(() => {
    if (Array.isArray(ledgerData) && ledgerData.length > 0) {
      if (!totalCredit && !totalDebit) {
        let totalCredit = 0;
        let totalDebit = 0;

        ledgerData.forEach((item) => {
          let creditTotalArray = 0;
          let debitTotalArray = 0;

          item.data.forEach((transaction) => {
            const credit = parseFloat(transaction.credit) || 0;
            const debit = parseFloat(transaction.debit) || 0;

            creditTotalArray += credit;
            debitTotalArray += debit;
          });

          totalCredit += creditTotalArray;
          totalDebit += debitTotalArray;
        });

        setTotalCredit(totalCredit);
        setTotalDebit(totalDebit);
      }
      if (totalCredit !== null && totalDebit !== null) {
        convertPdf();
      }
    }
  }, [ledgerData, totalCredit, totalDebit]);

  if (!ledgerData || !Array.isArray(ledgerData) || ledgerData.length <= 0) {
    return null;
  }

  const getType = (type) => {
    if (type === "13") {
      return "Invoice";
    } else if (type === "14") {
      return "Credit Note";
    } else if (type === "204") {
      return "A/P Down Payment";
    } else if (type === "10000079") {
      return "TDS Adjustment";
    } else if (type === "30") {
      return "Journal Entry";
    } else if (type === "46") {
      return "Outgoing Payment";
    } else if (type === "24") {
      return "Incoming Payment";
    } else {
      return "X";
    }
  };

  // const closingBalance = ledger?.data[ledger.data.length - 1]?.cL_BAL;

  return (
    <Fragment>
      {isConverting && (
        <div
          className="position-fixed top-0 align-items-center justify-content-center d-flex flex-column"
          style={{
            width: "100vw",
            height: "100vh",
            zIndex: "999",
            left: 0,
            background: "#00000080",
          }}
        >
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p style={{ color: "#fff" }}>Data processing please wait</p>
        </div>
      )}
      {ledgerData.map((ledger, index) => (
        <div
          className="pdf-page p-4 "
          style={{ overflow: "scroll", minWidth: 1000 }}
          key={index}
        >
          {ledger.data && ledger.data.length > 0 && (
            <Fragment>
              <div className="d-flex mb-3 justify-content-between align-items-center">
                <img
                  src="https://res.cloudinary.com/dd5ywsgmh/image/upload/v1704472204/lzjwbzci5prbvz4vstmz.jpg"
                  alt="Shipwall Logo"
                  width="200"
                  style={{ height: "auto" }}
                />
                <h2 style={{ fontSize: 24 }}>
                  {ledger.data[0].cardName}-{ledger.data[0].cardCode}
                </h2>
              </div>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>TaxDate</th>
                    <th>Transation Type</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    {/* <th>Cl_BAL</th> */}
                    <th>Payment Method</th>
                    <th>Cheque Number</th>
                  </tr>
                </thead>
                <tbody>
                  {ledger.data.map((data, i) => (
                    <tr key={i}>
                      <td>{data?.taxDate}</td>
                      <td>{data?.transaction_Type}</td>
                      <td>{data?.debit}</td>
                      <td>{data?.credit}</td>
                      {/* <td>{data?.cL_BAL}</td> */}
                      <td>{data?.pmntMode}</td>
                      <td>{data?.chqNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className="d-block">
                <div>
                  <b>Opening Balance : {ledger?.data[0].oP_BAL} </b>
                </div>
                <div>
                  <b>Ledger Total Credit: {totalCredit?.toFixed(2)}</b>
                </div>

                <div>
                  <b>Ledger Total Debit: {totalDebit?.toFixed(2)}</b>
                </div>

                <div>
                  <b>
                    Closing Balance :{" "}
                    {ledger?.data[ledger?.data?.length - 1]?.cL_BAL}{" "}
                  </b>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      ))}
    </Fragment>
  );
};

export default PdfTable;
