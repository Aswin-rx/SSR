import React, { useState } from "react";
import './Registration.css';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
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

  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState({
    createpassword: false,
    confirmpassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const setError = (field, message) => {
    setErrors((prev) => ({ ...prev, [field]: message }));
  };

  const setSuccess = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateField = (field) => {
    switch (field) {
      case "fullname":
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!formData.fullname.trim()) setError("fullname", "Full Name is required");
        else if (!nameRegex.test(formData.fullname)) setError("fullname", "Full Name must contain only alphabets");
        else setSuccess("fullname");
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) setError("email", "Email is required");
        else if (!emailRegex.test(formData.email)) setError("email", "Email is not valid");
        else setSuccess("email");
        break;

      case "phoneNumber":
        const phoneRegex = /^\d{10}$/;
        if (!formData.phoneNumber.trim()) setError("phoneNumber", "Phone Number is required");
        else if (!phoneRegex.test(formData.phoneNumber)) setError("phoneNumber", "Phone Number must be exactly 10 digits");
        else setSuccess("phoneNumber");
        break;

      case "birthdate":
        const today = new Date();
        const dob = new Date(formData.birthdate.trim());
        if (!formData.birthdate.trim()) setError("birthdate", "DOB is required");
        else if (dob > today) setError("birthdate", "Enter a valid DOB");
        else setSuccess("birthdate");
        break;

      case "address1":
      case "address2":
      case "region":
      case "city":
        if (!formData[field].trim()) setError(field, `${field} is required`);
        else setSuccess(field);
        break;

      case "country":
        if (!formData.country) setError("country", "Country is required");
        else setSuccess("country");
        break;

      case "postalcode":
        const postalRegex = /^\d+$/;
        if (!formData.postalcode.trim()) setError("postalcode", "Postal Code is required");
        else if (!postalRegex.test(formData.postalcode)) setError("postalcode", "Postal Code must contain only numbers");
        else setSuccess("postalcode");
        break;

      case "createpassword":
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/;
        if (!formData.createpassword.trim()) setError("createpassword", "Password is required");
        else if (!passwordRegex.test(formData.createpassword)) setError("createpassword", "Password must be at least 6 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character");
        else setSuccess("createpassword");
        break;

      case "confirmpassword":
        if (!formData.confirmpassword.trim()) setError("confirmpassword", "Confirm Password is required");
        else if (formData.confirmpassword !== formData.createpassword) setError("confirmpassword", "Passwords do not match");
        else setSuccess("confirmpassword");
        break;
    }
  };

  const validateForm = () => {
    Object.keys(formData).forEach(validateField);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateForm();
    
    if (Object.values(errors).every((err) => !err)) {
      console.log("Form Submitted Successfully", formData);
    }
  };

  return (
    <div className="container">
      <header>Registration Form</header>
      <form onSubmit={handleSubmit}>
        {["fullname", "email", "phoneNumber", "birthdate", "address1", "address2", "city", "region", "postalcode"].map((field) => (
          <div key={field} className={`input-box ${errors[field] ? "error" : ""}`}>
            <label htmlFor={field}>{field}</label>
            <input
              type={field === "birthdate" ? "date" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onBlur={() => validateField(field)}
            />
            <small>{errors[field]}</small>
          </div>
        ))}

        <div className="input-box">
          <label htmlFor="country">Country</label>
          <select name="country" value={formData.country} onChange={handleChange} onBlur={() => validateField("country")}>
            <option value="">Select Country</option>
            <option value="Country1">Country1</option>
            <option value="Country2">Country2</option>
          </select>
          <small>{errors.country}</small>
        </div>

        {["createpassword", "confirmpassword"].map((field) => (
          <div key={field} className={`input-box ${errors[field] ? "error" : ""}`} style={{ position: "relative" }}>
            <label htmlFor={field}>{field === "createpassword" ? "Create Password" : "Confirm Password"}</label>
            <input
              type={passwordVisible[field] ? "text" : "password"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              onBlur={() => validateField(field)}
            />
            <i
              className={`fa-solid ${passwordVisible[field] ? "fa-eye" : "fa-eye-slash"}`}
              onClick={() => togglePasswordVisibility(field)}
            ></i>
            <small>{errors[field]}</small>
          </div>
        ))}

        <button type="submit" disabled={Object.values(errors).some((err) => err)}>Submit</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
