import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AvatarComp } from "./AvatarComp"; // Your Avatar component
import { useDispatch, useSelector } from "react-redux"; // Import hooks from react-redux
import { authActions } from "../../app/AuthSlice";
import { authentication } from "../email_signin/config";
import { signOut } from "firebase/auth"; // Import signOut function

const Navbar = () => {
  const dispatch = useDispatch(); // Hook to dispatch actions
  const user = useSelector((state) => state.auth.user); // Hook to get the current user from your Redux store
  const handleLogout = () => {
    signOut(authentication)
      .then(() => {
        dispatch(authActions.logout()); // Dispatch logout action after successful signOut
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const [activeLink, setActiveLink] = useState("Home");
  const refs = {
    Home: useRef(null),
    Reservation: useRef(null),
    About: useRef(null),
    // Add other refs as needed
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    // Additional logic if needed
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Reservation", path: "/reservation" },
    { name: "Map", path: "/map" },
    // Add other links as needed
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex justify-center items-center ">
            <div className="text-3xl font-bold text-blue-600">
              VENUE <span className="text-black">STATION</span>
            </div>
          </div>{" "}
        </div>
        <div className="flex items-center space-x-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              ref={refs[link.name]}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeLink === link.name ? "text-blue-600" : "text-gray-600"
              }`}
              onClick={() => handleLinkClick(link.name)}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <AvatarComp name={user.fullName} />
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
