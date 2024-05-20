import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MdDownload } from "react-icons/md";
import Table from "react-bootstrap/Table";

import { parseISO, format } from "date-fns";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";
import { useNavigate } from "react-router-dom"
import Order from './Order'


const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const { orderList, fetchsales, handelDownload, getOrder } = useApi();
  const filteredOrders =
    orderList && orderList?.filter((item) => item?.soDocNum == id);

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
                  Sales Order Number : {id}
                </h4>
                <div>
                  <div className="table-responsive">
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Item Code </th>
                          <th>Item Name </th>
                          {/* <th>delDocNum</th>
                          <th>delDate</th>
                          <th>invDocNum</th>
                          <th>invDate</th> */}
                          <th style={{ textAlign: 'center' }}>Sales Order Quantity</th>
                          <th style={{ textAlign: 'center' }}>Total Delivery Quantity</th>
                          <th style={{ textAlign: 'center' }}>Total Invoice Quantity</th>
                          <th>Download Invoice </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(filteredOrders) &&
                          filteredOrders.map((item, index) => (
                            <tr key={index}>
                              <td> {item.itemCode} </td>
                              <td> {item.itemName} </td>
                              {/* <td> {item.delDocNum} </td>
                              <td>{item.delDate !== null ? item.delDate : 0}</td>
                              <td> {item.invDocNum} </td>
                              <td> {item.invDate !==null ? item.invDate : 0 } </td> */}
                              <td style={{ textAlign: 'center' }}> {item.soQty} </td>
                              <td style={{ textAlign: 'center' }}> {item.delQty} </td>
                              <td style={{ textAlign: 'center' }}> {item.invQty} </td>
                              <td>
                                {item?.invDocNum !== 0 && (
                                  <button onClick={()=>handlefetchSale(item.invDocEntry,item.invObjType)}>
                                    Invoice : <MdDownload />
                                  </button>
                                )}
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

export default OrderDetails;