import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdDownload } from "react-icons/md";
import Table from "react-bootstrap/Table";
import { FaArrowLeft } from "react-icons/fa6";
import { parseISO, format } from "date-fns";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";
import { useNavigate } from "react-router-dom";
import Order from "./Order";
import { Button } from "react-bootstrap";
import { FaEye } from "react-icons/fa";
const OrderInvoice = () => {
  const { id, itemcode } = useParams();
  const navigate = useNavigate();
  const { orderList, fetchsales, handelDownload, getOrder } = useApi();
  // const filteredOrders =
  //   orderList && orderList?.filter((item) => item?.soDocNum == id && item?.itemCode == itemcode);

  const filteredOrders = orderList
  ?.filter((item) => item?.soDocNum == id && item?.itemCode == itemcode)
  ?.reduce((acc, current) => {
    const x = acc.find((item) => item.invDocNum === current.invDocNum);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  console.log(filteredOrders, "order invoice");

  const handlefetchSale = async (soObjType, sotype) => {
    await fetchsales(soObjType, sotype);
  };

  return (
    <section className="bg-light py-2">
      <div className="container mt-4 mt-md-0 mt-lg-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="card border shadow-0">
              <div className="m-4">
                
                <h4 className="card-title mb-4 mt-4 mt-md-0 mt-lg-0 text text-bg-primary p-3 text-center">
                <Link
                  className='btn btn-warning'
                  to={`/order-details/${id}/${itemcode}`}
                  style={{float:'left',margin:'-4px 0 0'}}
                >
                  <FaArrowLeft />
                </Link>
                  Sales Order Number : {id}
                </h4>
                <div>
                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                        <th>  Item Code </th>
                        <th>  Item Name </th>
                          <th>  Inv No </th>
                          <th>Inv Date </th>
                          <th style={{ textAlign: "center" }}>
                           Inv Quantity
                          </th>
                          <th style={{ textAlign: "center" }}>
                            Inv Status
                          </th>
                          <th style={{ textAlign: "center" }}>
                            Download
                          </th>
                          <th>view </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(filteredOrders) &&
                          filteredOrders.map((item, index) => (
                            <tr key={index}>
                                <td> {item.itemCode} </td>
                              <td> {item.itemName} </td>
                              <td> {item.invDocNum} </td>
                              <td> {item.invDate} </td>
                              <td style={{ textAlign: "center" }}>
                                {" "}
                                {item.invQty}{" "}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                {" "}
                                {item.ordrstatus}{" "}
                              </td>
                              <td style={{ textAlign: "center" }}>
                              {item?.invDocNum !== 0 && (
                                  <button
                                    onClick={() =>
                                      handlefetchSale(
                                        item.invDocEntry,
                                        item.invObjType
                                      )
                                    }
                                  >
                                    Invoice : <MdDownload />
                                  </button>
                                )}
                              </td>
                              <td
                                style={{
                                  cursor: "pointer",
                                  textAlign: "center",
                                }}
                              >
                                {
                                  item.invQty >0 &&
                                <Link to={`/order-return/${item.soDocNum}/${item?.itemCode}`}>
                                  <FaEye />
                                </Link>
                                }
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                    {/* <button onClick={handelback}>back</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderInvoice;
