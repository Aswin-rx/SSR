import React, { useState } from "react";
import "./Registration.css"; // Include your CSS file
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
// Font Awesome

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phonenumber: "",
    birthdate: "",
    address1: "",
    address2: "",
    country: "",
    city: "",
    region: "",
    postalcode: "",
    createpassword: "",
    confirmpassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState({
    createpassword: false,
    confirmpassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  return (
    <div className="container">
      <header>Registration Form</header>
      <form id="form" className="form" onSubmit={handleSubmit}>
        {[
          { id: "fullname", type: "text", label: "Full Name" },
          { id: "email", type: "email", label: "Email" },
          { id: "phonenumber", type: "text", label: "Phone Number" },
          { id: "birthdate", type: "date", label: "Date of Birth" },
          { id: "address1", type: "text", label: "Address Line 1" },
          { id: "address2", type: "text", label: "Address Line 2" },
          { id: "city", type: "text", label: "City" },
          { id: "region", type: "text", label: "Region" },
          { id: "postalcode", type: "text", label: "Postal Code" },
        ].map((input) => (
          <div key={input.id} className="input-box">
            <label htmlFor={input.id}>{input.label}</label>
            <input
              type={input.type}
              id={input.id}
              name={input.id}
              value={formData[input.id]}
              onChange={handleChange}
            />
            <small></small>
          </div>
        ))}

        <div className="input-box">
          <label htmlFor="country">Country</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            <option value="Country1">Country1</option>
            <option value="Country2">Country2</option>
          </select>
          <small></small>
        </div>

        {["createpassword", "confirmpassword"].map((field) => (
          <div key={field} className="input-box" style={{ position: "relative" }}>
            <label htmlFor={field}>
              {field === "createpassword" ? "Create Password" : "Confirm Password"}
            </label>
            <input
              type={passwordVisible[field] ? "text" : "password"}
              id={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
            />
            <i
              id={`togglePassword${field}`}
              className={`fa-solid ${passwordVisible[field] ? "fa-eye" : "fa-eye-slash"}`}
              onClick={() => togglePasswordVisibility(field)}
              style={{ cursor: "pointer" }}
            ></i>
            <small></small>
          </div>
        ))}

        <div className="input-box">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;

