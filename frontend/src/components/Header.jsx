import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai"; // Importing search icon
import logo from "../image/logo.png"; // Importing logo image
import { useSelector, useDispatch } from "react-redux"; // Importing Redux hooks
import { signoutSuccess } from "../redux/user/userSlice"; // Importing Redux action creator

export default function Header() {
  const path = useLocation().pathname; // Get current path using useLocation hook
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

  return (
    <Navbar className="border-b-2 bg-gray-900">
      {/* Logo Link */}
      <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold">
        <img src={logo} alt="logo" className="h-14" />
      </Link>

      {/* Search Form (commented out for now) */}
      {/* <form>
        <TextInput
          type="text"
          placeholder="Search..."
          rightIcon={AiOutlineSearch}
          className="hidden lg:inline"
        />
      </form> */}

      {/* Search Button for Mobile */}
      <Button className="w-12 h-10 lg:hidden" color="gray" pill>
        <AiOutlineSearch />
      </Button>

      {/* Display user information and actions if currentUser exists */}
      {currentUser && (
        <div className="flex gap-2 md:order-2">
          {/* Display username */}
          <span className="block text-sm text-white font-medium truncate mr-2 mt-2">
            {currentUser.userName}
          </span>

          {/* Dropdown Menu for user actions */}
          <Dropdown arrowIcon={false} inline label={<Avatar alt="user" rounded />}>
            <Dropdown.Header>
              {/* Display username and email */}
              <span className="block text-sm">@{currentUser.userName}</span>
              <span className="block text-sm font-medium truncate">{currentUser.email}</span>
            </Dropdown.Header>
            {/* Display Dashboard link for admin users */}
            {currentUser.isAdmin && (
              <Link to="/dashboard?tab=client">
                <Dropdown.Item>Dashboard</Dropdown.Item>
              </Link>
            )}
            {/* Profile and Signout links */}
            <Link to="/profile">
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Signout</Dropdown.Item>
          </Dropdown>
        </div>
      )}

      {/* Navbar Toggle Button */}
      <Navbar.Toggle />

      {/* Navbar Links for authenticated users */}
      {currentUser && (
        <Navbar.Collapse>
          <Navbar.Link active={path === "/"} as={"div"}>
            <Link to="/" className="text-white hover:text-inherit active:text-inherit">
              Home
            </Link>
          </Navbar.Link>
          <Navbar.Link as={"div"}>
            <Link to="/" className="text-white hover:text-inherit active:text-inherit">
              Packages
            </Link>
          </Navbar.Link>
          <Navbar.Link as={"div"}>
            <Link to="/" className="text-white hover:text-inherit">
              About
            </Link>
          </Navbar.Link>
          <Navbar.Link as={"div"}>
            <Link to="/" className="text-white hover:text-inherit">
              Tenders
            </Link>
          </Navbar.Link>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}
