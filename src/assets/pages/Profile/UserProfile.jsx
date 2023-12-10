import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { authentication, db } from "../../email_signin/config";
import Navbar from "../../components/Navbar";

const UserProfile = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    // Fetch user information from Firestore
    const fetchUserInfo = async () => {
      try {
        const userDocRef = doc(db, "users", authentication.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setName(userData.fullName || "");
          setEmail(userData.email || "");
          setPhoneNumber(userData.phoneNumber || "");
          setAge(userData.age || "");
          setGender(userData.gender || "");
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  // Update user information in Firestore
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const userDocRef = doc(db, "users", authentication.currentUser.uid);
      await updateDoc(userDocRef, {
        fullName: name,
        email: email,
        phoneNumber: phoneNumber,
        age: age,
        gender: gender,
      });
      alert("Profile updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-10 p-5 text-black">
        <h1 className="text-2xl font-semibold mb-6">Update Profile</h1>
        <form
          onSubmit={handleUpdate}
          className="max-w-lg mx-auto bg-white p-6 rounded shadow"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {/* Phone Number field */}
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Phone Number"
            />
          </div>

          {/* Age field */}
          <div className="mb-4">
            <label htmlFor="age" className="block text-sm font-medium mb-2">
              Age
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Age"
            />
          </div>

          {/* Gender field */}
          <div className="mb-4">
            <label htmlFor="gender" className="block text-sm font-medium mb-2">
              Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Update button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300 mt-4"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
