import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { parseISO, format } from "date-fns";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { MdDownload } from "react-icons/md";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";
import { Col, Row } from "react-bootstrap";

const Order = () => {
  const { orderList, fetchsales, getOrder } = useApi();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    getOrder()
  },[])

  const uniqueOrderList = orderList
    ? orderList.reduce((uniqueOrders, currentOrder) => {
        const existingOrder = uniqueOrders.find(
          (order) => order.soDocNum === currentOrder.soDocNum
        );

        if (!existingOrder) {
          uniqueOrders.push(currentOrder);
        }

        return uniqueOrders;
      }, [])
    : [];

  // Calculate the index of the last item to be displayed
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item to be displayed
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Get the current items to display
  const currentItems = uniqueOrderList.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container h-100">
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
          <>
            <section className="bg-light py-2">
              <div className="container mt-4 mt-md-0 mt-lg-0">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="card border shadow-0">
                      <div className="m-4">
                        <h4 className="card-title mb-4 mt-4 mt-md-0 mt-lg-0 text text-bg-primary p-3 text-center">
                          Order History
                        </h4>
                        <div>
                          {orderList?.length === 0 ? (
                            <p>No Documents found</p>
                          ) : (
                            <div className="table-responsive">
                              <Table striped bordered hover>
                                <thead>
                                  <tr>
                                    <th style={{ textAlign: "center" }}>
                                      Order Number
                                    </th>
                                    <th style={{ textAlign: "center" }}>
                                     Order Date
                                    </th>
                                    <th style={{ textAlign: "center" }}>
                                     Order Value
                                    </th>
                                    <th style={{ textAlign: "center" }}>
                                      {" "}
                                      Used Credit Amount
                                    </th>
                                    <th style={{ textAlign: "center" }}>
                                      {" "}
                                      COD Amount
                                    </th>
                                    <th style={{ textAlign: "center" }}>
                                      {" "}
                                      Online Amount
                                    </th>
                                    <th style={{ textAlign: "center" }}>
                                      Download Sales Order
                                    </th>
                                    <th style={{ textAlign: "center" }}>
                                      View Details
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {currentItems.map((item, index) => (
                                    <tr key={index}>
                                      <td style={{ cursor: "pointer" }}>
                                        <Link
                                          to={`/order-details/${item.soDocNum}/${item?.itemCode}`}
                                        >
                                          {item?.soDocNum}
                                        </Link>
                                      </td>
                                      <td style={{ cursor: "pointer" }}>
                                        {item?.soDate
                                          ? format(
                                              parseISO(item?.soDate),
                                              "dd/MM/yyyy"
                                            )
                                          : ""}
                                      </td>
                                      <td style={{ textAlign: "center" }}>
                                        {" "}
                                        {item.soDocTotal}{" "}
                                      </td>
                                      <td style={{ textAlign: "center" }}>
                                        {" "}
                                        {item.usedcrdamt}{" "}
                                      </td>
                                      <td style={{ textAlign: "center" }}>
                                        {" "}
                                        {item.codamt}{" "}
                                      </td>
                                      <td style={{ textAlign: "center" }}>
                                        {" "}
                                        {item.onlineamt}{" "}
                                      </td>
                                      <td style={{ textAlign: "center" }}>
                                        <button
                                          onClick={() =>
                                            fetchsales(
                                              item?.soDocEntry,
                                              item?.soObjType
                                            )
                                          }
                                        >
                                          Sales Order: <MdDownload />
                                        </button>
                                        <br />
                                      </td>
                                      <td
                                        style={{
                                          cursor: "pointer",
                                          textAlign: "center",
                                        }}
                                      >
                                        <Link
                                          to={`/order-details/${item.soDocNum}/${item?.itemCode}`}
                                        >
                                          <FaEye />
                                        </Link>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                {[
                  ...Array(Math.ceil(uniqueOrderList.length / itemsPerPage)),
                ].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
              </Pagination>
            </div>
          </>
        </Col>
      </Row>
    </div>
  );
};

export default Order;
