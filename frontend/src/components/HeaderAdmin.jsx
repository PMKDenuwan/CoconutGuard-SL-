import { useState } from "react"; // Importing useState hook from React
import { Link, useNavigate } from "react-router-dom"; // Importing Link and useNavigate from React Router
import { useSelector, useDispatch } from "react-redux"; // Importing Redux hooks (useSelector and useDispatch)
import { Navbar, Dropdown, Avatar, Button } from "flowbite-react"; // Importing UI components from flowbite-react library
import { signoutSuccess } from "../redux/user/userSlice"; // Importing Redux action creator
import { AiOutlineSearch } from "react-icons/ai"; // Importing search icon from React Icons
import { FaBell } from "react-icons/fa"; // Importing bell icon from React Icons
import logo from "../image/logo2.png"; // Importing logo image

export default function HeaderAdmin() {
  const [isBellPopupOpen, setIsBellPopupOpen] = useState(false); // State for controlling bell popup visibility
  const toggleBellPopup = () => setIsBellPopupOpen(!isBellPopupOpen); // Function to toggle bell popup visibility
  const { currentUser } = useSelector((state) => state.user); // Selecting currentUser from Redux store
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // React Router's navigate hook

  // Function to handle sign-out
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/auth/signout", {
        method: "POST",
      });
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message); // Log error message if sign-out fails
      } else {
        dispatch(signoutSuccess()); // Dispatch signoutSuccess action if sign-out is successful
        navigate("/sign-in"); // Redirect to sign-in page after sign-out
      }
    } catch (error) {
      console.log(error.message); // Log error message if fetch operation fails
    }
  };

  // BellPopup component to display notifications
  const BellPopup = () => (
    <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20">
      <ul>
        <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
          Notification 1
        </li>
        <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
          Notification 2
        </li>
        <li className="cursor-pointer px-4 py-2 hover:bg-gray-100">
          Notification 3
        </li>
      </ul>
    </div>
  );

  return (
    <Navbar className="border-b-2 bg-white relative">
      {/* Logo Link */}
      <Link
        to="/"
        className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold"
      >
        <img src={logo} alt="logo" className="h-14" />
      </Link>

      {/* Search Button for Mobile */}
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      {/* Display user information and actions if currentUser exists */}
      {currentUser && (
        <div className="flex gap-2 md:order-2">
          {/* Bell icon button with toggle for notifications */}
          <button onClick={toggleBellPopup} className="relative">
            <FaBell className="mr-4" />
            {isBellPopupOpen && <BellPopup />} {/* Render BellPopup if isBellPopupOpen is true */}
          </button>

          {/* Display username */}
          <span className="block text-sm text-black font-medium truncate mr-2 mt-2">
            {currentUser.userName}
          </span>

          {/* Dropdown menu for user actions */}
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt="user" rounded />}
          >
            <Dropdown.Header>
              {/* Display username and email */}
              <span className="block text-sm">@{currentUser.userName}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {/* Display Dashboard link for admin users */}
            {currentUser.isAdmin && (
              <Link to={"/dashboard?tab=client"}>
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Link>
            )}
            {/* Profile and Signout links */}
            <Link to={"/profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Signout</Dropdown.Item>
          </Dropdown>
        </div>
      )}
      {/* Navbar toggle button */}
      <Navbar.Toggle />
    </Navbar>
  );
}
