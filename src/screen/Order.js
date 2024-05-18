import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { parseISO, format } from "date-fns";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/Pagination";
import { MdDownload } from "react-icons/md";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";

const Order = () => {
  const { orderList, fetchsales, getOrder } = useApi();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
  const currentItems = uniqueOrderList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
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
                              <th>OrderID</th>
                              <th>So Date</th>
                              <th> Used Credit Amount</th>
                              <th> COD Amount</th>
                              <th> Online Amount</th>
                              <th>Download Sales Order</th>
                              <th>View Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentItems.map((item, index) => (
                              <tr key={index}>
                                <td style={{ cursor: "pointer" }}>
                                  <Link to={`/order-details/${item.soDocNum}`}>
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
                                <td> {item.usedcrdamt} </td>
                                <td> {item.codamt} </td>
                                <td> {item.onlineamt} </td>
                                <td>
                                  <button
                                    onClick={() =>
                                      fetchsales(item?.soDocEntry, item?.soObjType)
                                    }
                                  >
                                    Sales Order: <MdDownload />
                                  </button>
                                  <br />
                                </td>
                                <td style={{ cursor: "pointer" }}>
                                  <Link to={`/order-details/${item.soDocNum}`}>
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
                <div className="border-top pt-4 mx-4 mb-4">
                  <p>
                    <i className="fas fa-truck text-muted fa-lg" /> Free
                    Delivery within 1-2 weeks
                  </p>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        <Pagination>
          {[...Array(Math.ceil(uniqueOrderList.length / itemsPerPage))].map(
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      </div>
    </>
  );
};

export default Order;
