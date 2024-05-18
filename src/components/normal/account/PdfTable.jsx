import React, { Fragment, useEffect, useState } from "react";
import Table from 'react-bootstrap/Table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useApi } from "../../../contextApi/ApiContexts/ApiContexts";
import { toast } from "react-toastify";

const PdfTable = ({ onClose }) => {

  const { ledgerData, dowloadLedger } = useApi();
  const [pdfData, setPdfData] = useState('');
  const [isConverting, setIsConverting] = useState(false)

  useEffect(() => {
    if (ledgerData.length === 0) {
      dowloadLedger()
    }
  }, [])

  const convertPdf = async () => {
    try {
      setIsConverting(true)
      const canvasArray = [];
      const pages = document.querySelectorAll('.pdf-page');

      for (let i = 0; i < pages.length; i++) {
        pages[i].style.width = `${pages[i].scrollWidth}px`;
        pages[i].style.height = "auto";
        pages[i].style.overflow = 'auto';
        const canvas = await html2canvas(pages[i],
          {
            allowTainted: true,
            useCORS: true
          }
        );
        pages[i].style.height = "0px";
        pages[i].style.overflow = 'hidden';
        pages[i].style.width = "auto";
        canvasArray.push(canvas);
      }

      const pdf = new jsPDF();
      canvasArray.forEach((canvas, index) => {
        if (index !== 0) {
          pdf.addPage();
        }
        const imgData = canvas.toDataURL('image/webp', 1);
        const imgWidth = 210; // Adjust as needed
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, 'WEBP', 0, 0, imgWidth, imgHeight);
      });

      const pdfData = pdf.output('datauristring');
      if (!!pdfData) {
        setPdfData(pdfData);
        const link = document.createElement('a');
        link.href = pdfData;
        link.download = `${ledgerData[0].data[0].cardName}-${ledgerData[0].data[0].cardCode}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success("Ladger downloaded successfully");
      } else {
        toast.error('cound not converted ladger into PDF file')
      }
    } catch (error) {
      toast.error("something went wrong")
    } finally {
      onClose(false)
      setIsConverting(false)
    }
  }

  useEffect(() => {
    if (Array.isArray(ledgerData) && ledgerData.length > 0) {
      convertPdf()
    }
  }, [ledgerData])

  if (!ledgerData || !Array.isArray(ledgerData) || ledgerData.length <= 0) {
    return null
  }

  return (
    <Fragment>
      {isConverting && (
        <div className='position-fixed top-0 align-items-center justify-content-center d-flex flex-column' style={{ width: "100vw", height: "100vh", zIndex: '999', left: 0, background: '#00000080' }}>
          <div className="spinner-border text-light" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <p style={{ color: "#fff" }}>Data processing please wait</p>
        </div>
      )}
      {ledgerData.map((ledger, index) => (
        <div className="pdf-page p-4 " style={{ height: 0, overflow: "scroll", minWidth: 1000 }} key={index}>
          {ledger.data && ledger.data.length > 0 && (
            <Fragment>
              <div className="d-flex mb-3 justify-content-between align-items-center">
                <img src="https://res.cloudinary.com/dd5ywsgmh/image/upload/v1704472204/lzjwbzci5prbvz4vstmz.jpg" alt="Shipwall Logo" width="200" style={{ height: 'auto' }} />
                <h2 style={{ fontSize: 24 }}>{ledger.data[0].cardName}-{ledger.data[0].cardCode}</h2>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>TaxDate</th>
                    <th>Transation Type</th>
                    <th>Debit</th>
                    <th>Credit</th>
                    <th>Cl_BAL</th>
                    <th>Payment Method</th>
                    <th>Cheque Number</th>
                  </tr>
                </thead>
                <tbody>
                  {ledger.data.map((data, i) => (
                    <tr key={i}>
                      <td>{data?.taxDate}</td>
                      <td>{data?.transType}</td>
                      <td>{data?.debit}</td>
                      <td>{data?.credit}</td>
                      <td>{data?.cL_BAL}</td>
                      <td>{data?.pmntMode}</td>
                      <td>{data?.chqNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Fragment>
          )}
        </div>
      ))}
    </Fragment>
  );
};

export default PdfTable;