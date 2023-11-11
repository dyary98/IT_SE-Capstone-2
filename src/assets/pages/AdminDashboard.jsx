import React, { useState, useEffect } from "react";
import { authentication, db } from "../email_signin/config"; // Adjust the import path as needed
import { doc, getDoc, collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
const Card = ({ title, value }) => {
  return (
    <div className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg p-5 flex flex-col justify-between transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <h4 className="text-lg font-bold">{title}</h4>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
};

const AdminDashboard = () => {
  const [fullName, setFullName] = useState("");
  const [images, setImages] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [newTime, setNewTime] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const user = authentication.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setFullName(userSnap.data().fullName || user.email); // Fallback to email if fullName not available
        }
      }
    };

    fetchUserData();
  }, []);

  const handleAddImage = async (e) => {
    e.preventDefault();

    if (!imageFile) return;

    const storage = getStorage();
    const storageRef = ref(storage, `images/${imageFile.name}`);

    try {
      // Upload image to Firebase Storage
      const snapshot = await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      // Add image URL and description to Firestore
      await addDoc(
        collection(db, "users", authentication.currentUser.uid, "images"),
        {
          url: downloadURL,
          description: description,
        }
      );

      // Update local state
      setImages([...images, { description, url: downloadURL }]);
      setDescription("");
      setImageFile(null);
    } catch (error) {
      console.error("Error uploading image: ", error);
    }
  };

  const handleAddTime = () => {
    setAvailability([...availability, newTime]);
    setNewTime("");
  };

  const handleRemoveTime = (timeToRemove) => {
    setAvailability(availability.filter((time) => time !== timeToRemove));
  };
  const firstName = fullName.split(" ")[0];
  const initial = firstName.charAt(0);

  return (
    <div className="bg-gray-900 min-h-screen p-5 text-gray-100">
      <div className="text-center text-4xl font-bold mb-10 text-white">
        Admin Dashboard
      </div>

      <div className="flex items-center space-x-4 mb-8">
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-500 text-white text-xl font-semibold">
          {initial}
        </div>
        <span className="font-medium text-lg text-white">{firstName}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Cards */}
        <Card title="Total Revenue" value="$5,000" />
        <Card title="Active Users" value="4,200" />
        <Card title="Satisfaction Rate" value="95%" />
      </div>

      {/* Chart placeholder - remains unchanged */}

      <div className="bg-gray-900 min-h-screen p-5 text-gray-100">
        <section className="mb-8">
          <form onSubmit={handleAddImage} className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="imageUpload" className="mb-2 font-semibold">
                Upload Image:
              </label>
              <input
                id="imageUpload"
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="file:bg-blue-500 file:border-none file:text-white file:font-semibold file:py-2 file:px-4 file:rounded file:cursor-pointer hover:file:bg-blue-600"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2 font-semibold">
                Description:
              </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter a description"
                className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
            >
              Add Image
            </button>
          </form>
          {/* Display images here */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <img className="w-full" src={image.url} alt="Uploaded" />
                <div className="px-6 py-4">
                  <p className="text-gray-700 text-base">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              placeholder="Add Available Time"
              className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
            />
            <button
              onClick={handleAddTime}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
            >
              Add Time
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-gray-900">
              <thead>
                <tr className="bg-gray-800 text-white uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Time Slot</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {availability.map((time, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {time}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleRemoveTime(time)}
                        className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
export default AdminDashboard;
