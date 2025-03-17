import React, { useState, useEffect } from "react";
import { Button, TextInput, Alert } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { HiInformationCircle } from "react-icons/hi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateClient() {
  const { id } = useParams();
  const [formData, setFormData] = useState({});

  const [durationError, setDurationError] = useState('');
  const [projectIDError, setProjectIDError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const { data } = await axios.get(`/api/client?clientId=${id}`);
        if (data.client && data.client.length > 0) {
          setFormData(data.client[0]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchClient();
  }, [id]);

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate projectID
    if (name === 'projectID') {
      const isValidProjectID = /^PO\d{4}$/.test(value); // Must start with 'PO' followed by 4 digits
      setProjectIDError(isValidProjectID ? '' : 'Project ID must start with PO followed by 4 digits (e.g., PO1234).');
    }

    // Validate phone number
    if (name === 'phone') {
      const isValidPhoneNumber = /^\d{10}$/.test(value); // Must be exactly 10 digits
      setPhoneError(isValidPhoneNumber ? '' : 'Phone number must be 10 digits.');
    }

    // Validate duration
    if (name === 'duration'){
      const isValidDuration = /^\d{3}$/.test(value); // Must be exactly 3 digits
      setDurationError(isValidDuration ? '' : 'Duration must be 3 digits.');
    }

    // Log a message after the form submission logic
    console.log('handleSubmit function execution completed.');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    try {
      await axios.put(`/api/client/${id}`, formData);
      toast.success("Client updated successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(()=>{
        Navigate('/dashboard?tab=client');
      },1000);
      
    } catch (error) {
      console.error(error);
      // Handle API error (optional)
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
        <h1 className="text-center text-3xl my-7 font-semibold">Update Client</h1>

        <TextInput
          type="text"
          placeholder="Client name"
          required
          name="name"
          className="flex-1"
          value={formData.name}
          onChange={handleChange}
        />

       <TextInput
         type="text"
         placeholder="Company Name"
         required
         name="companyname"  // Ensure this matches with formData key
         value={formData.companyname}
         onChange={handleChange}
      />


        <TextInput
          type="text"
          placeholder="Address"
          required
          name="address"
          className="flex-1"
          value={formData.address}
          onChange={handleChange}
        />

        <TextInput
          type="text"
          placeholder="Project ID (e.g., PO1234)"
          required
          name="projectID"
          className="flex-1"
          value={formData.projectID}
          onChange={handleChange}
        />
        {projectIDError && (
          <Alert color="failure" icon={HiInformationCircle}>
            {projectIDError}
          </Alert>
        )}

        <TextInput
          type="number"
          placeholder="Contact number"
          required
          name="phone"
          className="flex-1"
          value={formData.phone}
          onChange={handleChange}
        />
        {phoneError && (
          <Alert color="failure" icon={HiInformationCircle}>
            {phoneError}
          </Alert>
        )}
        
        <TextInput
          type="number"
          placeholder="Duration of contract (xxx months)"
          required
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
        {durationError && (
          <Alert color="failure" icon={HiInformationCircle}>
            {durationError}
          </Alert>
        )}

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
