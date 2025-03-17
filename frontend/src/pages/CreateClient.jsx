import React, { useState } from "react";
import { Button, TextInput, Alert } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { HiInformationCircle } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateClient() {
  const [formData, setFormData] = useState({
    name: "",
    companyname: "",
    address: "",
    projectID: "",
    phone: "",
    duration: "",

  });
  const [phoneError, setPhoneError] = useState('');
  const [projectIDError, setProjectIDError] = useState('');
  const [durationError, setDurationError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate phone number
    if (name === 'phone') {
      const isValidPhoneNumber = /^\d{10}$/.test(value); // Must be exactly 10 digits
      setPhoneError(isValidPhoneNumber ? '' : 'Phone number must be 10 digits.');
    }
    
    // Validate projectID
    if (name === 'projectID') {
      const isValidProjectID = /^PO\d{4}$/.test(value); // Must start with 'PO' followed by 4 digits
      setProjectIDError(isValidProjectID ? '' : 'Project ID must start with PO followed by 4 digits (e.g., PO1234).');
    }
    
    // Validate duration
    if (name === 'duration') {
      const isValidDuration = /^\d{3}$/.test(value); // Must be 3 digits
      setDurationError(isValidDuration ? '' : 'Duration months must be 3 digits');
    }

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    const isValid = validateForm();
    if (!isValid) {
      alert('Please fix the form errors before submitting.');
      return;
    }

    try {
      await axios.post("/api/client", formData);
      toast.success("New Client Added successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        navigate('/dashboard?tab=client');
        },1000);
    } catch (error) {
      console.error(error);
    }
  };

  const validateForm = () => {
    const isValidPhoneNumber = /^\d{10}$/.test(formData.phone);
    const isValidProjectID = /^PO\d{4}$/.test(formData.projectID);
    const isValidDuration = /^\d{3}$/.test(formData.duration);

    setPhoneError(isValidPhoneNumber ? '' : 'Phone number must be 10 digits.');
    setProjectIDError(isValidProjectID ? '' : 'Project ID must start with PO followed by 4 digits (e.g., PO1234).');
    setDurationError(isValidDuration ? '' : 'Duration must be 3 digits.');

    return isValidPhoneNumber && isValidProjectID && isValidDuration;
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-5">
        <h1 className="text-center text-3xl my-7 font-semibold">New Client</h1>

        {/* Client Name */}
        <TextInput
          type="text"
          placeholder="Client Name"
          required
          name="name"
          onChange={handleChange}
        />

         {/* Company Name */}
         <TextInput
          type="text"
          placeholder="Company Name"
          required
          name="companyname"
          onChange={handleChange}
        />

        {/* Address */}
        <TextInput
          type="text"
          placeholder="Address"
          required
          name="address"
          onChange={handleChange}
        />

        {/* Project ID */}
        <TextInput
          type="text"
          placeholder="Project ID (e.g., PO1234)"
          required
          name="projectID"
          onChange={handleChange}
        />
        {projectIDError && (
          <Alert color="failure" icon={HiInformationCircle}>
            {projectIDError}
          </Alert>
        )}

        {/* Contact Number */}
        <TextInput
          type="number"
          placeholder="Contact number"
          required
          name="phone"
          onChange={handleChange}
        />
        {phoneError && (
          <Alert color="failure" icon={HiInformationCircle}>
            {phoneError}
          </Alert>
        )}

         {/* Duration of contarct */}
         <TextInput
          type="number"
          placeholder="Duration of contaract (xxx months)"
          required
          name="duration"
          onChange={handleChange}
        />
        {durationError && (
          <Alert color="failure" icon={HiInformationCircle}>
            {durationError}
          </Alert>
        )}

        {/* Form Actions */}
        <div className="flex justify-between mt-5">
          <Link to="/dashboard?tab=client">
            <Button type="button" color="dark">
              Back
            </Button>
          </Link>
          <Button type="submit" color="blue">
            Save
          </Button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}