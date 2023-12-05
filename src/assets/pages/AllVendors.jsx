import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth"; // Import signOut function
import { authentication, db } from "../email_signin/config"; // Ensure you import the authentication object from your Firebase config
import IMAGES from "../../Images/Images";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux"; // Import hooks from react-redux
import { authActions } from "../../app/AuthSlice";

// Fetch user details and images
async function fetchUsersWithRole2() {
  const usersRef = collection(db, "vendors");
  const q = query(usersRef);
  const querySnapshot = await getDocs(q);

  // Fetch user details and images
  const usersData = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const userImagesRef = collection(db, "vendors", doc.id, "images");
      const imagesSnapshot = await getDocs(userImagesRef);
      const images = imagesSnapshot.docs.map((imgDoc) => imgDoc.data().url);
      return {
        id: doc.id,
        fullName: doc.data().fullName,
        images: images.length > 0 ? images : [IMAGES.Image2], // Fallback to default image
      };
    })
  );

  return usersData;
}

// Custom hook using @tanstack/react-query
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

  // Filter users based on the search term
  const filteredUsers = users?.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full p-8 flex flex-col items-center">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-8 p-4 w-full max-w-md border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {filteredUsers.map((user) => (
            <Link to={`/vendors/${user.id}`} key={user.id} className="block">
              <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:scale-105">
                <img
                  src={user.images[0] || IMAGES.Image1}
                  alt={user.fullName}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{user.fullName}</h3>
                  <p className="text-gray-600">Some description</p>{" "}
                  {/* You can replace with actual description */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllVendors;
