import React, { useState, useEffect } from "react";
import { authentication, db } from "../email_signin/config"; // Adjust the import path as needed
import {
  doc,
  getDoc,
  collection,
  addDoc,
  query,
  getDocs,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
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
  const [newTime, setNewTime] = useState({
    startTime: "",
    endTime: "",
    available: false,
  });

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

      // Fetch images
      const imagesRef = collection(db, "users", user.uid, "images");
      const imageQuery = query(imagesRef);
      const imageSnapshots = await getDocs(imageQuery);
      const userImages = imageSnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setImages(userImages);

      // Fetch time slots (availability)
      const availabilityRef = collection(db, "users", user.uid, "availability");
      const availabilityQuery = query(availabilityRef);
      const availabilitySnapshots = await getDocs(availabilityQuery);
      const userAvailability = availabilitySnapshots.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAvailability(userAvailability);
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

  const handleDeleteImage = async (imageId, imageUrl) => {
    try {
      // Create a reference to the file to delete
      const storage = getStorage();
      const imageRef = ref(storage, imageUrl);

      // Delete the file
      await deleteObject(imageRef);

      // Delete the document from Firestore
      await deleteDoc(
        doc(db, "users", authentication.currentUser.uid, "images", imageId)
      );

      // Update local state
      setImages(images.filter((image) => image.id !== imageId));
    } catch (error) {
      console.error("Error deleting image: ", error);
    }
  };

  const handleAddTime = async () => {
    if (!newTime.startTime || !newTime.endTime) return;

    try {
      // Add new time slot to Firestore
      const docRef = await addDoc(
        collection(db, "users", authentication.currentUser.uid, "availability"),
        newTime
      );

      // Update local state with new time slot including generated Firestore document ID
      setAvailability([...availability, { ...newTime, id: docRef.id }]);
      setNewTime({ startTime: "", endTime: "", available: false });
    } catch (error) {
      console.error("Error adding time slot: ", error);
    }
  };

  const handleRemoveTime = async (timeId) => {
    try {
      // Remove time slot from Firestore
      await deleteDoc(
        doc(db, "users", authentication.currentUser.uid, "availability", timeId)
      );

      // Update local state
      setAvailability(availability.filter((time) => time.id !== timeId));
    } catch (error) {
      console.error("Error removing time slot: ", error);
    }
  };

  const handleToggleAvailability = async (timeId) => {
    const slot = availability.find((time) => time.id === timeId);
    if (slot) {
      try {
        const updatedSlot = { ...slot, available: !slot.available };

        // Update time slot in Firestore
        await setDoc(
          doc(
            db,
            "users",
            authentication.currentUser.uid,
            "availability",
            timeId
          ),
          updatedSlot
        );

        // Update local state
        setAvailability(
          availability.map((time) => (time.id === timeId ? updatedSlot : time))
        );
      } catch (error) {
        console.error("Error updating time slot: ", error);
      }
    }
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
            {images.map((image) => (
              <div
                key={image.id}
                className="max-w-sm rounded overflow-hidden shadow-lg"
              >
                <img className="w-full" src={image.url} alt="Uploaded" />
                <div className="px-6 py-4 flex justify-between items-center">
                  <p className="text-gray-700 text-base">{image.description}</p>
                  <button
                    onClick={() => handleDeleteImage(image.id, image.url)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-8">
          {/* Form for adding new time slots */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={newTime.startTime}
              onChange={(e) =>
                setNewTime({ ...newTime, startTime: e.target.value })
              }
              placeholder="Start Time"
              className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
            />
            <input
              type="text"
              value={newTime.endTime}
              onChange={(e) =>
                setNewTime({ ...newTime, endTime: e.target.value })
              }
              placeholder="End Time"
              className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700"
            />
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newTime.available}
                onChange={(e) =>
                  setNewTime({ ...newTime, available: e.target.checked })
                }
              />
              <span className="ml-2">Available</span>
            </label>
            <button
              onClick={handleAddTime}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded cursor-pointer transition-colors"
            >
              Add Time Slot
            </button>
          </div>

          {/* The rest of your time slot display section... */}
          {/* Table for displaying time slots */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white text-gray-900">
              <thead>
                <tr className="bg-gray-800 text-white uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Start Time</th>
                  <th className="py-3 px-6 text-left">End Time</th>
                  <th className="py-3 px-6 text-center">Available</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {availability.map((time) => (
                  <tr
                    key={time.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {time.startTime}
                    </td>
                    <td className="py-3 px-6 text-left">{time.endTime}</td>
                    <td className="py-3 px-6 text-center">
                      {time.available ? "Yes" : "No"}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleToggleAvailability(time.id)}
                        className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        Toggle
                      </button>
                      <button
                        onClick={() => handleRemoveTime(time.id)}
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
