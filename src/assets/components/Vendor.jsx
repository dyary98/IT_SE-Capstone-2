import React, { useState, useEffect } from "react";
import IMAGES from "../../Images/Images";
import { FaStar } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { useParams } from "react-router-dom";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { authentication, db } from "../email_signin/config";

const Vendor = () => {
  const { productId } = useParams();
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [currentUser, setCurrentUser] = useState(null);

  // Hardcoded comments
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Alice",
      comment: "Great place!",
      rating: 5,
      userImage: IMAGES.Image6,
    },
    {
      id: 2,
      user: "Bob",
      comment: "Loved it!",
      rating: 4,
      userImage: IMAGES.Image7,
    },
  ]);
  const handleSelectSlot = (slotId) => {
    const slot = availability.find((s) => s.id === slotId);
    if (slot && slot.available) {
      setSelectedSlot(slotId);
      console.log("Selected slot:", slotId);
    }
  };
  const handleReservation = async () => {
    if (!selectedSlot || !user) {
      alert("Please select a time slot and ensure you are logged in.");
      return;
    }

    const reservationDetails = {
      userName: user.displayName, // Name of the user making the reservation
      timeSlot: selectedSlot, // The selected time slot
      reservationDate: new Date().toISOString(), // Current date and time
    };

    try {
      // Reference to the reservations collection within the user document
      const reservationsRef = collection(
        db,
        "users",
        productId,
        "reservations"
      );

      // Add the reservation
      await addDoc(reservationsRef, reservationDetails);

      // Update the availability array to set the selected time slot as unavailable
      const updatedAvailability = availability.map((slot) =>
        slot.id === selectedSlot ? { ...slot, available: false } : slot
      );
      setAvailability(updatedAvailability);

      // Update the time slot in Firestore
      const slotRef = doc(db, "users", productId, "availability", selectedSlot);
      await updateDoc(slotRef, { available: false });

      alert("Reservation successful!");
    } catch (error) {
      console.error("Error making reservation: ", error);
      alert("There was an error making your reservation. Please try again.");
    }
  };
  const handleSubmitComment = async () => {
    console.log("Comment:", newComment);
    console.log("Rating:", newRating);
    console.log("Current User:", user);

    // Ensure the user is logged in and newComment is not empty
    if (!user || !newComment.trim() || newRating === 0) {
      alert(
        "Please enter a comment, select a rating, and ensure you're logged in."
      );
      return;
    }

    try {
      // Reference to the user's comments collection
      const commentsRef = collection(db, "users", productId, "comments");
      console.log(user);
      // Add a new comment
      await addDoc(commentsRef, {
        comment: newComment,
        rating: newRating,
        fullName: user.displayName,
      });

      // Fetch and update the comments list
      const updatedCommentsSnap = await getDocs(commentsRef);
      const updatedComments = updatedCommentsSnap.docs.map((doc) => doc.data());
      setComments(updatedComments);

      // Reset the comment input and rating
      setNewComment("");
      setNewRating(0);
      setHoverRating(0);
    } catch (error) {
      console.error("Error submitting comment: ", error);
      alert("There was an error submitting your comment. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const userRef = doc(db, "users", productId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setUser(userSnap.data());

        // Fetch availability and images
        const availabilityRef = collection(userRef, "availability");
        const availabilitySnap = await getDocs(availabilityRef);
        setAvailability(availabilitySnap.docs.map((doc) => doc.data()));

        const imagesRef = collection(userRef, "images");
        const imagesSnap = await getDocs(imagesRef);
        setImages(imagesSnap.docs.map((doc) => doc.data()));

        // Fetch comments
        const commentsRef = collection(db, "users", productId, "comments");
        const commentsSnap = await getDocs(commentsRef);
        setComments(
          commentsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        fetchCurrentUser().then((userData) => {
          setCurrentUser(userData);
        });
      }
    };

    fetchUserData();
  }, [productId]);

  const fetchCurrentUser = async () => {
    setUser(authentication.currentUser);
    console.log("Logged in user: ", user); // Add this line to log the logged-in user details
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        return userSnap.data(); // This should include the fullName
      }
    }
    return null;
  };
  // Render Comments Section
  const renderComments = () => {
    if (comments.length === 0) {
      return (
        <div className="text-center p-4">
          <FaStar className="text-6xl mx-auto mb-4 text-gray-400" />
          <p>No reviews yet. Be the first to review!</p>
        </div>
      );
    }
    return comments.map((comment) => (
      <li key={comment.id} className="mb-4 p-4 border rounded-lg">
        <div className="flex items-center mb-2">
          {comment.userImage ? (
            <img
              src={comment.userImage}
              alt={comment.user || "User"}
              className="w-20 h-20 rounded-full mr-4"
            />
          ) : (
            <div className="w-20 h-20 rounded-full mr-4 bg-gray-300 flex items-center justify-center text-2xl">
              {comment.fullName
                ? comment.fullName.charAt(0).toUpperCase()
                : "U"}
            </div>
          )}
          <strong>{comment.fullName || "Anonymous"}</strong>
          <div className="flex ml-2">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className="mr-1"
                size={20}
                color={index < (comment.rating || 0) ? "#ffc107" : "#e4e5e9"}
              />
            ))}
          </div>
        </div>
        <p>{comment.comment || "No comment provided."}</p>
      </li>
    ));
  };

  const renderTimeSlots = () => {
    return availability.map((slot) => (
      <button
        key={slot.id} // Ensure this is a unique identifier for each time slot
        onClick={() => slot.available && handleSelectSlot(slot.id)}
        className={`p-4 border rounded-lg transition-colors duration-300 ${
          selectedSlot === slot.id
            ? "bg-green-500 text-white" // Selected slot
            : slot.available
            ? "bg-gray-500 text-white hover:bg-gray-600" // Available slot
            : "bg-red-500 text-white cursor-not-allowed" // Unavailable slot
        }`}
        disabled={!slot.available} // Disable button if slot is not available
      >
        {slot.startTime} - {slot.endTime}
      </button>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      {user ? (
        <>
          {/* User Details */}
          <div className="w-full h-[60vh] flex justify-center items-center">
            <img
              src={images.length > 0 ? images[0].url : "default_image_url"}
              alt={user.fullName}
              className="w-full m-8 h-full object-cover rounded-lg shadow-lg shadow-green-950"
            />
          </div>
          <div className="shadow-green-950 flex flex-col mx-8 border-2 border-black rounded-3xl my-8 p-8 shadow-2xl p">
            <h1 className="text-5xl mt-4 mr-8 mb-2">{user.fullName}</h1>
            <div className="flex items-center">
              <h1 className="text-2xl mt-6 mr-8 mb-2">
                {user.price || "Price not available"}
              </h1>
              <h1 className="text-2xl mt-6 mb-2 flex">
                <ImLocation className="mr-1" size={40} /> {user.location}
              </h1>
            </div>
            <p className="text-lg mb-8">{user.description}</p>
          </div>

          {/* Availability Time Slots */}
          <div className="mb-8 bg-primaryColor p-8 rounded-3xl text-white mx-8 shadow-2xl shadow-white">
            <h2 className="text-3xl mb-4">Available Time Slots</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderTimeSlots()}
            </div>
            <button
              className="bg-thirdColor p-2 mt-4 rounded-md w-40 text-black"
              onClick={handleReservation}
            >
              Reserve
            </button>
          </div>

          {/* Add Comment Section */}

          {user && (
            <div className="mb-8 mx-8 p-4 rounded-3xl border-2 border-black shadow-2xl shadow-green-950">
              <h2 className="text-3xl mb-4">Add a Comment</h2>
              <div className="flex flex-col">
                <textarea
                  className="p-2 border rounded-lg mb-4"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write your comment here..."
                ></textarea>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className="cursor-pointer"
                      size={30}
                      onMouseEnter={() => setHoverRating(index + 1)}
                      onMouseLeave={() => setHoverRating(newRating)}
                      onClick={() => setNewRating(index + 1)}
                      color={
                        index < (hoverRating || newRating)
                          ? "#ffc107"
                          : "#e4e5e9"
                      }
                    />
                  ))}
                </div>
                <button
                  className="bg-thirdColor mt-4 p-2 rounded-md text-black"
                  onClick={handleSubmitComment}
                >
                  Submit Comment
                </button>
              </div>
            </div>
          )}

          {/* Comments Section */}
          {/* Comments Section */}
          <div className="mb-8 mx-8 p-4 rounded-3xl border-2 border-black shadow-2xl shadow-green-950">
            <h2 className="text-3xl mb-4">Comments and Ratings</h2>
            <ul>{renderComments()}</ul>
          </div>
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default Vendor;
