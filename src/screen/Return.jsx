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

const Return = () => {

  const { logOutsap } = useAppContext();

  const {
    PlaceReturnRequest,
    getARInvoice,
    arInvoiceList,
    getARInvoice1,
    singleBPdata,
  } = useApi();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);
  const [returnQuantities, setReturnQuantities] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState({
    label: "",
    value: "",
    data: {},
  });
  const [invoiceSelected, setInvoiceSelected] = useState(
    Array(arInvoiceList?.length).fill(false)
  );
  const [addedRows, setAddedRows] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [returnAddress, setReturnAddress] = useState("");


  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems =
    Array.isArray(arInvoiceList) &&
    arInvoiceList.slice(indexOfFirstItem, indexOfLastItem);

  const handleDropdownChange = (index, selected) => {
    if (!invoiceSelected[index]) {
      toast.error("Please select invoice first");
      return;
    }
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = [...prevSelectedItems];
      newSelectedItems[index] = selected;
      return newSelectedItems;
    });
  };

  const handleinvoiceChange = async (e, index) => {
    const res = await getARInvoice1(e.value);
    setSelectedInvoice({
      ...selectedInvoice,
      [index]: {
        label: e.label,
        value: e.value,
        data: res,
      },
    });
    setInvoiceSelected((prevInvoiceSelected) => {
      const newInvoiceSelected = [...prevInvoiceSelected];
      newInvoiceSelected[index] = true;
      return newInvoiceSelected;
    });
  };

  const handelChange = (index, enteredValue) => {
    const valueNotmore =
      selectedItems[index]?.quantity - selectedItems[index]?.tillRetQuantity ||
      0;
    if (enteredValue === valueNotmore || enteredValue > valueNotmore) {
      toast.error(
        `Return value is not more then Available Quantity: ${valueNotmore}`
      );
      return;
    }
    setReturnQuantities((prevReturnQuantities) => {
      const newReturnQuantities = [...prevReturnQuantities];
      newReturnQuantities[index] = enteredValue;
      return newReturnQuantities;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getARInvoice();
      setInvoiceSelected(Array(arInvoiceList?.length).fill(false));
    };
    fetchData();
  }, []);

  const consolidateData = (items) => {
    return items
      .map((item, index) => {
        return {
          docEntry: 0,
          lineNum: parseFloat(selectedItems[index]?.lineNum) || 0,
          itemCode: selectedItems[index]?.itemCode || "",
          dscription: selectedItems[index]?.description || "",
          quantity: parseInt(returnQuantities[index]) || 0,
          price: parseFloat(selectedItems[index]?.price) || 0,
          priceBefDi: 0,
          fright1Amount: 0,
          baseEntry: selectedInvoice[index]?.value || "",
          baseType: "13",
          baseLine: 0,
          deliveryType: "",
        };
      })
      .filter((data) => data.quantity > 0 && data.docEntry !== "");
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "120px",
      // height: "40px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };

  const handelReturn = async () => {
    if (!selectedDate) {
      toast.error("please select date");
      return;
    }
    if (returnQuantities.length === 0) {
      toast.error("please add Quantity to return");
      return;
    }
    try {
      const consolidatedCurrentItems = consolidateData(currentItems);
      const consolidatedAddedRows = consolidateData([...Array(addedRows)]);
      const consolidatedData = [
        ...consolidatedCurrentItems,
        ...consolidatedAddedRows,
      ];
      console.log("consolidatedAddedRows", consolidatedAddedRows)
      PlaceReturnRequest(consolidatedAddedRows, remarks, selectedDate, returnAddress);
    } catch (error) {
      console.log(error);
    } finally {
      setSelectedInvoice({});
      setSelectedItems([]);
      setReturnQuantities([]);
      setAddedRows(1);
      setInvoiceSelected(Array(arInvoiceList?.length).fill(false));
      setRemarks("");
      setSelectedDate(null);
    }
  };

  const invoiceOption =
    Array.isArray(currentItems) &&
    currentItems.map((item) => ({
      label: item.docNum,
      value: item.docEntry,
    }));

  const addMoreRow = () => {
    setAddedRows((prevAddedRows) => prevAddedRows + 1);
  };

  console.log("first", selectedItems);

  const renderAddedRows = () => {
    return [...Array(addedRows)].map((_, index) => (
      <tr key={`addedRow_${index}`}>
        <>
          <td style={{ cursor: "pointer" }}>
            <Select
              options={invoiceOption}
              onChange={(e) => handleinvoiceChange(e, index)}
              value={
                selectedInvoice[index]
                  ? {
                      value: selectedInvoice[index].value,
                      label: selectedInvoice[index].label,
                    }
                  : null
              }
              styles={customStyles}
            />
          </td>
          <td style={{ cursor: "pointer" }}>
            <Select
              options={
                selectedInvoice[index]?.data.length > 0
                  ? invoiceSelected[index] &&
                    selectedInvoice[index]?.data[0]?.details?.map(
                      (item1, index1) => ({
                        value: item1,
                        label: item1.itemCode,
                      })
                    )
                  : null
              }
              onChange={(selectedOption) =>
                handleDropdownChange(index, selectedOption.value)
              }
              value={
                selectedInvoice[index]?.data[0]?.details.length === 1
                  ? {
                      value:
                        selectedInvoice[index]?.data[0]?.details[0].itemCode,
                      label:
                        selectedInvoice[index]?.data[0]?.details[0].itemCode,
                    }
                  : selectedInvoice[index]?.data[0]?.details.length > 1
                  ? selectedItems[index] && {
                      value: selectedItems[index],
                      label: selectedItems[index].itemCode,
                    }
                  : null
              }
              styles={customStyles}
              isDisabled={!invoiceSelected[index]}
            />
          </td>
          <td> {selectedItems[index]?.description} </td>
          <td> {selectedItems[index]?.quantity} </td>
          <td>
            {selectedItems[index]?.quantity -
              selectedItems[index]?.tillRetQuantity || 0}
          </td>

          <td>
            <input
              type="text"
              value={returnQuantities[index] || ""}
              onChange={(e) => handelChange(index, e.target.value)}
            />
          </td>

          <td>
            <button
              onClick={() => removeRow(index)}
              className="btn btn-outline-danger"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
          </td>
        </>
      </tr>
    ));
  };

  const removeRow = (indexToRemove) => {
    setReturnQuantities((prevReturnQuantities) =>
      prevReturnQuantities.filter((_, index) => index !== indexToRemove)
    );
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.filter((_, index) => index !== indexToRemove)
    );
    setInvoiceSelected((prevInvoiceSelected) =>
      prevInvoiceSelected.filter((_, index) => index !== indexToRemove)
    );
    setAddedRows((prevAddedRows) => prevAddedRows - 1);
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
                        Return
                      </h4>

                      <div>
                        {arInvoiceList?.length === 0 ? (
                          <p>No Documents found</p>
                        ) : (
                          <>
                            <div>
                              <div className="row justify-content-between align-items-center mb-3">
                                <div className="col-md-4">
                                  <label>
                                    <b>Date:</b>
                                  </label>
                                  <br />
                                  <div className="dateBx">
                                    <DatePicker
                                      selected={selectedDate}
                                      onChange={(date) => setSelectedDate(date)}
                                      dateFormat="yyyy/MM/dd"
                                      className="form-control customeInput"
                                    />
                                    <i class="fas fa-calendar-alt"></i>
                                  </div>
                                </div>
                                <div className="col-md-4">
                                  <label>
                                    <b>Return address:</b>
                                  </label>
                                  <textarea
                                    type="text"
                                    value={returnAddress}
                                    onChange={(e) => setReturnAddress(e.target.value)}
                                    className="form-control custom-textarea"
                      
                                    
                                  />
                                </div>
                                <div className="col-md-4">
                                  <label>
                                    <b>Remarks:</b>
                                  </label>
                                  <textarea
                                    type="text"
                                    value={remarks}
                                    onChange={(e) => setRemarks(e.target.value)}
                                    className="form-control custom-textarea"
                                    rows={5}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="table-responsive">
                              <Table
                                striped
                                bordered
                                hover
                                style={{
                                  overflowY: "auto",
                                  minHeight: "300px",
                                }}
                              >
                                <thead>
                                  <tr>
                                    <th>Sales Invoice</th>
                                    <th>Item Code</th>
                                    <th> Description</th>
                                    <th> Invoice Quantity</th>
                                    <th> Available Quantity</th>
                                    <th>Return Quantity</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {/* {Array.isArray(currentItems) &&
                                  currentItems.map((item, index) => (
                                    <tr key={index}>
                                      <td style={{ cursor: "pointer" }}>
                                        <Select
                                          options={invoiceOption}
                                          onChange={(e) =>
                                            handleinvoiceChange(e, index)
                                          }
                                          value={
                                            selectedInvoice[index]
                                              ? {
                                                  value:
                                                    selectedInvoice[index].value,
                                                  label:
                                                    selectedInvoice[index].label,
                                                }
                                              : null
                                          }
                                          styles={customStyles}
                                        />
                                      </td>
                                      <td style={{ cursor: "pointer" }}>
                                        <Select
                                          options={
                                            selectedInvoice[index]?.data.length > 0
                                              ? invoiceSelected[index] &&
                                                selectedInvoice[
                                                  index
                                                ]?.data[0]?.details?.map(
                                                  (item1, index1) => ({
                                                    value: item1,
                                                    label: item1.itemCode,
                                                  })
                                                )
                                              : null
                                          }
                                          onChange={(selectedOption) =>
                                            handleDropdownChange(
                                              index,
                                              selectedOption.value
                                            )
                                          }
                                          value={
                                            selectedInvoice[index]?.data[0]?.details
                                              .length === 1
                                              ? {
                                                  value:
                                                    selectedInvoice[index]?.data[0]
                                                      ?.details[0].itemCode,
                                                  label:
                                                    selectedInvoice[index]?.data[0]
                                                      ?.details[0].itemCode,
                                                }
                                              : selectedInvoice[index]?.data[0]
                                                  ?.details.length > 1
                                              ? selectedItems[index] && {
                                                  value: selectedItems[index],
                                                  label:
                                                    selectedItems[index].itemCode,
                                                }
                                              : null
                                          }
                                          styles={customStyles}
                                          isDisabled={!invoiceSelected[index]}
                                        />
                                      </td>
                                      <td> {selectedItems[index]?.description} </td>
                                      <td> {selectedItems[index]?.quantity} </td>
                                      <td>
                                        {selectedItems[index]?.quantity -
                                          selectedItems[index]?.tillRetQuantity ||
                                          0}
                                      </td>

                                      <td>
                                        <input
                                          type="text"
                                          value={returnQuantities[index] || ""}
                                          onChange={(e) =>
                                            handelChange(index, e.target.value)
                                          }
                                        />
                                      </td>
                                    </tr>
                                  ))} */}
                                  {renderAddedRows(currentItems.length + 1)}
                                </tbody>
                              </Table>
                            </div>
                          </>
                        )}
                      </div>
                      <Button
                        className="btn btn-success"
                        onClick={handelReturn}
                      >
                        Submit
                      </Button>

                      <Button
                        className="btn btn-primary mx-2"
                        onClick={addMoreRow}
                      >
                        <FaPlusCircle /> Add
                      </Button>
                    </div>
                    {/* <div className="border-top pt-4 mx-4 mb-4">
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
                    </div> */}
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

export default Return;
