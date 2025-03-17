import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";    // Importing action creators from Redux slice
import logo from "../image/logo.png";

export default function Signin() {
  const dispatch = useDispatch();  // Redux dispatch function
  const [formData, setFormData] = useState({}); // State to hold form data
  const { loading, error: errorMessage } = useSelector((state) => state.user); // Selecting loading state and error message from Redux store
  const navigate = useNavigate(); // React Router's navigate hook
  
    // Function to handle form input changes
  const handleChange = (e) => {
    // Update formData state with input values (trimmed)
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    // Check if email and password are provided
    if (!formData.email || !formData.password) {
      // Dispatch failure action if fields are not filled
      return dispatch(signInFailure("Please fill out all the fields."));
    }

    try {
      dispatch(signInStart());  // Dispatch start action (loading state)

      // Send POST request to sign-in endpoint with form data
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Convert formData to JSON string
      });
      const data = await res.json();   // Parse response data 

      console.log(data); // Log response data to console


      if (data.success === false) {
         // Dispatch failure action if sign-in was unsuccessful
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
         // Dispatch success action if response is successful
        dispatch(signInSuccess(data));
        navigate("/"); // Navigate user to home page
      }
    } catch (error) {
      // Dispatch failure action if an error occurs during fetch
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        {/* left */}
        <div className="flex-1">
          <div className="bg-slate-900">
            <img src={logo} alt="logo" className="h-20" />
          </div>
          <p className="text-sm mt-5">
      

Welcome to Shan Construction Management System, your comprehensive solution for efficient project management in the construction industry. Whether you're overseeing residential developments, commercial builds, or infrastructure projects, Shan Construction offers tailored tools and resources to streamline workflows, optimize scheduling, and enhance collaboration. Discover how our platform can elevate your construction management experience from planning to completion.
          </p>
        </div>

        {/* right */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange} // Moved onChange to TextInput
              />
            </div>
            <div>
              <Label value="Your password" />
              <TextInput
                type="password"
                placeholder="**************"
                id="password"
                onChange={handleChange} // Moved onChange to TextInput
              />
            </div>

            <Button gradientDuoTone="purpleToPink" type="submit">
              Sign In
            </Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Don't Have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
