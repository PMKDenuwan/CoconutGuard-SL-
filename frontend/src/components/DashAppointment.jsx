import { Button, Card } from "flowbite-react"; // Importing Button and Card components from flowbite-react library
import { useEffect, useState } from "react"; // Importing useEffect and useState hooks from React
import axios from "axios"; // Importing axios for making HTTP requests
import Swal from "sweetalert2"; // Importing SweetAlert2 for displaying confirmation dialogs
import { IoTrashBinOutline } from "react-icons/io5"; // Importing Trash Bin icon from React Icons
import { CgAlbum } from "react-icons/cg"; // Importing Album icon from React Icons

export default function DashAppointment() {
  const [appointments, setAppointments] = useState([]); // State variable for appointments
  const [totalAppointments, setTotalAppointments] = useState(""); // State variable for total number of appointments
  const [totalPendingAppointments, setTotalPendingAppointments] = useState("");
  const [totalApprovedAppointments, setTotalApprovedAppointments] = useState("");
  const [sortCriteria, setSortCriteria] = useState('total');

  // Fetch appointments and total appointments count from the API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get("/api/appointment"); // Fetch data from the '/api/appointment' endpoint
        setAppointments(data.appointment); // Set appointments state with fetched appointment data
        setTotalAppointments(data.totalAppointments); // Set totalAppointments state with fetched total appointments count

        const pendingCount = data.appointment.filter(a => a.status === "pending").length;
        const approvedCount = data.appointment.filter(a => a.status === "successful").length;
        setTotalPendingAppointments(pendingCount);
        setTotalApprovedAppointments(approvedCount);

      } catch (error) {
        console.error(error); // Log any errors that occur during data fetching
      }
    };

    fetchAppointments(); // Invoke the fetchAppointments function on component mount
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  console.log(appointments); // Log appointments array to the console

  // Function to handle deletion of an appointment
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      // Display a confirmation dialog using SweetAlert2
      title: "Are you sure?",
      text: "Do you want to delete this appointment?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "No, keep it",
    });

    if (result.isConfirmed) {
      // If user confirms deletion
      try {
        const res = await axios.delete(`/api/appointment/${id}`); // Send DELETE request to delete the appointment
        setAppointments((currentAppointments) =>
          currentAppointments.filter((p) => p._id !== id)
        ); // Update appointments state by filtering out the deleted appointment
        console.log(res); // Log the response from the DELETE request
      } catch (error) {
        console.error(error); // Log any errors that occur during deletion
      }
    }
  };

  // Function to handle updating the status of an appointment
  const handleUpdate = async (id) => {
    try {
      const formdata = { status: "successful" }; // Define form data for status update
      const res = await axios.put(`/api/appointment/${id}`, formdata); // Send PUT request to update appointment status
      setAppointments((currentAppointments) =>
        currentAppointments.map((appointment) =>
          appointment._id === id
            ? { ...appointment, status: "successful" }
            : appointment
        )
      ); // Update appointments state by mapping and updating the status of the specific appointment
      console.log(res); // Log the response from the PUT request
     
      const pendingCount = appointments.filter(a => a.status === "pending").length - 1;
      const approvedCount = appointments.filter(a => a.status === "successful").length + 1;
      setTotalPendingAppointments(pendingCount);
      setTotalApprovedAppointments(approvedCount);

    } catch (error) {
      console.error(error); // Log any errors that occur during status update
    }
  };

  const sortAppointments = (appointments, criteria) => {
    switch (criteria) {
      case 'total':
        return [...appointments];
      case 'pending':
        return [...appointments].sort((a, b) => (a.status === 'pending' ? -1 : 1));
      case 'approved':
        return [...appointments].sort((a, b) => (a.status === 'successful' ? -1 : 1));
      default:
        return [...appointments];
    }
  };

  const sortedAppointments = sortAppointments(appointments, sortCriteria);

  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
  };

  const handleCardClick = (criteria) => {
    setSortCriteria(criteria);
  };

  return (
    <div className="overflow-x-auto mx-auto w-full mr-2 mt-6 ml-2 mb-6">
      <h1 className="text-4xl mb-10">Appointments</h1>
      
      <div className="summary-cards-container flex flex-wrap gap-4 ml-3">

      {/* Display total appointments count */}
      <div className="flex gap-2">
          <Card onClick={() => handleCardClick('total')} className="max-w-xs p-6 cursor-pointer shadow-lg transition-transform transform hover:scale-105 bg-white rounded-lg border border-gray-200 hover:bg-gray-100">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-lg text-gray-800">Total Appointments</p>
              <CgAlbum className="text-4xl text-blue-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{totalAppointments}</h1>
          </Card>
        </div>

        {/* Display total pending appointments count */}
        <div className="flex gap-2">
          <Card onClick={() => handleCardClick('pending')} className="max-w-xs p-6 cursor-pointer shadow-lg transition-transform transform hover:scale-105 bg-white rounded-lg border border-gray-200 hover:bg-gray-100">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-lg text-gray-800">Total Pending Appointments</p>
              <CgAlbum className="text-4xl text-yellow-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{totalPendingAppointments}</h1>
          </Card>
        </div>

        {/* Display total approved appointments count */}
        <div className="flex gap-2">
          <Card onClick={() => handleCardClick('approved')} className="max-w-xs p-6 cursor-pointer shadow-lg transition-transform transform hover:scale-105 bg-white rounded-lg border border-gray-200 hover:bg-gray-100">
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-lg text-gray-800">Total Approved Appointments</p>
              <CgAlbum className="text-4xl text-green-500" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">{totalApprovedAppointments}</h1>
          </Card>
        </div>

    </div>
    
    {/* Render each appointment as a Card */}
    
    {sortedAppointments.map((appointment, index) => (
      <Card key={index} className="max-w-4xl mb-7 ml-3">
        <div className="flex justify-end">
          {/* Render delete button for each appointment */}
          <a
            onClick={() => {
              handleDelete(appointment._id); // Invoke handleDelete function on delete button click
            }}
            className="font-medium text-red-600 hover:underline ml-7 cursor-pointer"
          >
            <IoTrashBinOutline className="text-2xl" />
          </a>
        </div>
      
        {/* Display appointment details */}
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          <span className="mr-4">{appointment.date}</span>
          <span>{appointment.time}</span>
        </h5>
         
        <p className="font-normal text-gray-700 mb-2">
              <span className="font-medium">Name:</span> {appointment.fullName}
            </p>
            <p className="font-normal text-gray-700 mb-2">
              <span className="font-medium">Contact Number:</span> {appointment.phone}
            </p>
            <p className="font-normal text-gray-700 mb-2">
              <span className="font-medium">Company Name:</span> {appointment.companyName}
            </p>

        <p>{appointment.message}</p>

        {/* Display appointment status with conditional styling */}
        <div
          className={`${
            appointment.status === "pending" ? "bg-blue-200" : "bg-green-200"
          } w-max rounded pl-1 pe-2`}
        >
          <p className="font-normal text-gray-700 dark:text-gray-400">
            <span className="font-medium">{appointment.status}</span>
          </p>
        </div>
        {/* Render update button for pending appointments */}
        <div className="flex justify-end gap-3">
          <div className="mr-5">
            <Button
              color="blue"
              disabled={appointment.status === "successful"} // Disable button for successful appointments
              onClick={() => {
                handleUpdate(appointment._id); // Invoke handleUpdate function on button click
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Card>
    ))}
  </div>
  
  );
}
