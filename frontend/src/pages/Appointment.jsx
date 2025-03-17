import React, { useState } from 'react';
import { Button, TextInput, Label, Textarea, Alert } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Importing axios for making HTTP requests
import { FaArrowRightLong } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Appointment() {
  const [formData, setFormData] = useState({}); // State for form data
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
  const navigate = useNavigate(); // Accessing navigation functionality using useNavigate hook
  const { currentUser } = useSelector((state) => state.user); // Accessing current user from Redux store

  // Function to handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });   //Update form data with new input value
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Trigger validation only when the form is submitted
    setFormSubmitted(true);

    // Validate phone number and email
    const isValidPhone = formData.phone && formData.phone.length === 10;
    const isValidEmail = formData.email && /\S+@\S+\.\S+/.test(formData.email);

    // Set error states based on validation
    setPhoneError(!isValidPhone);
    setEmailError(!isValidEmail);



    // Proceed with form submission if both fields are valid
    if (isValidPhone && isValidEmail) {
      const appointmentData = { ...formData, userId: currentUser._id };
      try {
        const appointmentDate = await axios.get('/api/appointment', {
          params: {
            date: formData.date,
            time: formData.time,
          },
        });
        const matchingAppointments = appointmentDate.data.appointment.filter(appointment => 
          appointment.date === formData.date && appointment.time === formData.time
        );
        if (matchingAppointments.length > 0) {
          toast.error('Appointment already exists for this date and time', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
          });
          return;
        }

            
        await axios.post('/api/appointment', appointmentData);
        toast.success('Message sent successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

        setTimeout(() => {
          navigate('/');
          },1000);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-5">
        <h1 className="text-center text-3xl my-7 font-semibold">MAKE AN APPOINTMENT</h1>

        <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
         <div className="flex-1">
          <div className="mb-2 block">
              <Label value="Full Name" />
          </div>
          <TextInput
            type="text"
            placeholder="Full name"
            required
            name="fullName"
            className="flex-1"
            onChange={handleChange}
          />
          </div>
          <div className="flex-1">
           <div className="mb-2 block">
              <Label value="Company Name" />
            </div>
          <TextInput
            type="text"
            placeholder="Company Name"
            required
            name="companyName"
            className="flex-1"
            onChange={handleChange}
          />
           </div>
        </div>
          <div className='flex-1'>
           <div className="mb-2 block">
              <Label value="Email" />
            </div>
          <TextInput
            type="text"
            placeholder="Email (example@email.com)"
            required
            name="email"
            className="flex-1"
            onChange={handleChange}
          />
          </div>
          {formSubmitted && emailError && (
            <Alert className="mt-2" color="failure">
              Please enter a valid email address.
            </Alert>
          )}
       
        <div className="flex-1">
          <div className="mb-2 block">
            <Label value="Phone Number"/>
          </div>
          <TextInput
            type="number"
            placeholder="Phone number (10 digits only)"
            required
            name="phone"
            className="flex-1"
            onChange={handleChange}
          />
        </div>  
          {formSubmitted && phoneError && (
        
            <Alert className="mt-2" color="failure"  >
              Please add exactly 10 numbers for the phone number!
            </Alert>
          )}
          
        
        <div className="flex flex-col gap-4 sm:flex-row justify-between mt-5">
          <div className="flex-1">
            <div className="mb-2 block">
              <Label value="Appointment Date" />
            </div>
            <TextInput type="date" required name="date" className="flex-1" onChange={handleChange} />
          </div>
          <div className="flex-1">
            <div className="mb-2 block">
              <Label value="Time" />
            </div>
            <TextInput type="time" required name="time" className="flex-1" onChange={handleChange} />
          </div>
        </div>
        <div>
          <Textarea name="message" placeholder="Message" required rows={4} onChange={handleChange} />
        </div>
        <div className="flex justify-between">
          <div>
            <Button type="submit" color="blue">
              <span className="mr-1">Send</span> <FaArrowRightLong />
            </Button>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}