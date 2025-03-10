import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../contextApi/ApiContexts/ApiContexts";

const NewRegistration = () => {

      const { newRegistration } = useApi();

  const [formData, setFormData] = useState({
    cardName: "",
    cellular: "",
    e_Mail: "",
    abnno: "",
    acnno: "",
    slpCode:1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form data submitted:", formData);
    newRegistration(formData);
    setFormData({
        cardName: "",
        cellular: "",
        e_Mail: "",
        abnno: "",
        acnno: "",
        slpCode:1,
    });
  };

  return (
    <div className="container mt-5">
      {/* page breadcrumbs start */}
      <section className="pageBreadcrumbs mb-4">
        <article className="container">
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link className="text" to="/">
                Home
              </Link>
            </li>
            <li className="breadcrumb-item active">New Registration</li>
          </ul>
        </article>
      </section>
      {/* page breadcrumbs end */}

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="mb-3 col-md-6">
            <label className="form-label">
              Customer Trade Name (Mandatory):
            </label>
            <input
              type="text"
              className="form-control"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">Mobile No (Mandatory):</label>
            <input
              type="number"
              className="form-control"
              name="cellular"
              value={formData.cellular}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3 col-md-6">
            <label className="form-label">Email ID (Optional):</label>
            <input
              type="email"
              className="form-control"
              name="e_Mail"
              value={formData.e_Mail}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">ABN (Optional):</label>
            <input
              type="text"
              className="form-control"
              name="abnno"
              value={formData.abnno}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3 col-md-6">
            <label className="form-label">ACN (Optional):</label>
            <input
              type="text"
              className="form-control"
              name="acnno"
              value={formData.acnno}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewRegistration;
