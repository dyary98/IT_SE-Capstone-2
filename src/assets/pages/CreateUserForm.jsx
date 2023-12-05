import React, { useState } from "react";
import { addUser } from "../email_signin/AddUser";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db, authentication } from "../email_signin/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const CreateUserForm = () => {
  // States for user details
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  // New states for additional fields
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [stadiumSize, setStadiumSize] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [price, setPrice] = useState("");

  // Firestore collection reference
  const vendorsRef = collection(db, "vendors");

  // Function to handle form submission

  // Function to add user to Firestore
  const addVendor = async (vendorData, uid) => {
    const vendorDocRef = doc(db, "vendors", uid); // Create a reference to a doc with UID as the document ID
    await setDoc(vendorDocRef, vendorData); // Set the document data
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    const userCredential = await createUserWithEmailAndPassword(
      authentication,
      email,
      password
    );
    const user = userCredential.user;
    try {
      await addVendor(
        {
          uid: user.uid,
          email,
          password,
          fullName,
          latitude,
          longitude,
          description,
          street,
          stadiumSize,
          phoneNumber,
          price,
        },
        user.uid
      );
      // Clear form fields after successful submission
      setEmail("");
      setFullName("");
      setPassword("");
      setLatitude("");
      setLongitude("");
      setDescription("");
      setStreet("");
      setStadiumSize("");
      setPhoneNumber("");
      setPrice("");
      // Optionally, show success message to the user
    } catch (error) {
      console.error("Error creating user: ", error);
      // Optionally, show error message to the user
    }
  };

  // Function to handle location fetching
  const handleLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toString());
          setLongitude(position.coords.longitude.toString());
        },
        () => {
          alert("Unable to retrieve your location");
        }
      );
    }
  };

  // Form JSX
  return (
    <form
      onSubmit={handleSubmit}
      className="w-2/3 mx-auto mt-10 p-8 border rounded-lg shadow-lg"
    >
      {/* Full name input */}
      <div className="mb-6">
        <label
          htmlFor="fullName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex gap-10">
        {/* Email input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Password input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {/* Latitude and Longitude input */}
      <div className="gap-10 flex">
        {/* Latitude input */}
        <div className="my-4 mr-2">
          <label
            htmlFor="latitude"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Latitude
          </label>
          <input
            type="text"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            placeholder="Latitude"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {/* Longitude input */}
        <div className="my-4 mr-[30px]">
          <label
            htmlFor="longitude"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Longitude
          </label>
          <input
            type="text"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            placeholder="Longitude"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {/* Button to use current location */}
      <div className="mb-6">
        <button
          type="button"
          onClick={handleLocation}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Use My Location
        </button>
      </div>

      {/* Description input */}
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          rows={5}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex gap-10">
        {/* Street input */}
        <div className="mb-4">
          <label
            htmlFor="street"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Street
          </label>
          <input
            type="text"
            id="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder="Street"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Stadium size input */}
        <div className="mb-4">
          <label
            htmlFor="stadiumSize"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Stadium Size
          </label>
          <input
            type="text"
            id="stadiumSize"
            value={stadiumSize}
            onChange={(e) => setStadiumSize(e.target.value)}
            placeholder="Stadium Size"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>
      <div className="flex  gap-10">
        {/* Phone number input */}
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {/* Price input */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price (IQD)
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price in IQD"
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {/* Submit button */}
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Create User
        </button>
      </div>
    </form>
  );
};

export default CreateUserForm;
