import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  collection,
  getDocs,
  query as firestoreQuery,
} from "firebase/firestore";
import { authentication, db } from "../email_signin/config";
import IMAGES from "../../Images/Images";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
  PhoneIcon,
  LocationMarkerIcon,
  CashIcon,
  ViewGridIcon,
} from "@heroicons/react/solid";

// Fetch user details and images
async function fetchUsersWithRole2() {
  const usersRef = collection(db, "vendors");
  const q = firestoreQuery(usersRef);
  const querySnapshot = await getDocs(q);

  const usersData = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const userDocData = doc.data();

      // Fetch images from a sub-collection or wherever they are stored
      const userImagesRef = collection(db, "vendors", doc.id, "images");
      const imagesSnapshot = await getDocs(userImagesRef);
      const images = imagesSnapshot.docs.map((imgDoc) => imgDoc.data().url);

      // Return user object with all required fields
      return {
        id: doc.id,
        fullName: userDocData.fullName,
        email: userDocData.email, // Assuming 'email' is a field in your document
        images: images.length > 0 ? images : [IMAGES.Image2],
        price: userDocData.price, // Add this line
        phoneNumber: userDocData.phoneNumber, // Add this line
        street: userDocData.street, // Add this line
        stadiumSize: userDocData.stadiumSize,
      };
    })
  );

  return usersData;
}

const useFetchUsersWithRole2 = () => {
  return useQuery({
    queryKey: ["usersWithRole2"],
    queryFn: fetchUsersWithRole2,
    // You can add other options here if necessary
  });
};

const AllVendors = () => {
  const { data: users, isLoading, isError } = useFetchUsersWithRole2();
  const [searchTerm, setSearchTerm] = useState("");
  const [stadiumSize, setstadiumSize] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [streetFilter, setStreetFilter] = useState("");

  const filteredUsers = users?.filter((user) => {
    return (
      (searchTerm === "" ||
        user.fullName?.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (stadiumSize === "" ||
        user.stadiumSize?.toString().includes(stadiumSize)) &&
      (priceFilter === "" || user.price?.toString().includes(priceFilter)) &&
      (phoneFilter === "" || user.phoneNumber?.includes(phoneFilter)) &&
      (streetFilter === "" ||
        user.street?.toLowerCase().includes(streetFilter.toLowerCase()))
    );
  });

  if (isLoading) return <div style={{ ...loaderStyle }}>Loading...</div>;
  if (isError) return <div>Error fetching users</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full p-8 flex flex-col items-center">
        {/* Additional filters */}
        <div className="flex flex-wrap gap-4 justify-center my-4">
    <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-3 w-full md:w-auto rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    />
    <input
        type="text"
        placeholder="Filter by stadiumSize..."
        value={stadiumSize}
        onChange={(e) => setstadiumSize(e.target.value)}
        className="p-3 w-full md:w-auto rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    />
    <input
        type="text"
        placeholder="Filter by price..."
        value={priceFilter}
        onChange={(e) => setPriceFilter(e.target.value)}
        className="p-3 w-full md:w-auto rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    />
    <input
        type="text"
        placeholder="Filter by phone..."
        value={phoneFilter}
        onChange={(e) => setPhoneFilter(e.target.value)}
        className="p-3 w-full md:w-auto rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    />
    <input
        type="text"
        placeholder="Filter by street..."
        value={streetFilter}
        onChange={(e) => setStreetFilter(e.target.value)}
        className="p-3 w-full md:w-auto rounded-lg shadow-sm border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
    />
</div>

        {/* Vendor cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {/* Map through filteredUsers and display cards */}
          {filteredUsers.map((user) => (
            <Link to={`/vendors/${user.id}`} key={user.id} className="block">
              <div className="bg-gradient-to-r from-blue-100 via-gray-100 to-blue-200 rounded-lg shadow-md overflow-hidden hover:shadow-lg transform transition duration-500 hover:scale-105">
                <img
                  src={user.images[0] || IMAGES.Image1}
                  alt={user.fullName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">
                    {user.fullName}
                  </h3>
                  <div className="flex flex-wrap justify-between items-center text-sm">
                    <div className="flex items-center my-1">
                      <CashIcon className="h-5 w-5 text-blue-600 mr-2" />
                      {user.price}
                    </div>
                    <div className="flex items-center my-1">
                      <PhoneIcon className="h-5 w-5 text-green-600 mr-2" />
                      {user.phoneNumber}
                    </div>
                    <div className="flex items-center my-1">
                      <LocationMarkerIcon className="h-5 w-5 text-purple-600 mr-2" />
                      {user.street}
                    </div>
                    <div className="flex items-center my-1">
                      <ViewGridIcon className="h-5 w-5 text-red-600 mr-2" />
                      {user.stadiumSize}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const filterInputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ddd",
  boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
  width: "100%",
};

const filterContainerStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "10px",
  marginBottom: "20px",
};

const vendorCardStyle = {
  transition: "transform 0.5s, box-shadow 0.5s",
};

const loaderStyle = {
  border: "5px solid #f3f3f3",
  borderTop: "5px solid #3498db",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  animation: "spin 2s linear infinite",
};

export default AllVendors;
