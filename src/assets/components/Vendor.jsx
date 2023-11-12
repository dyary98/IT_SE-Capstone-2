import React, { useState, useEffect } from "react";
import IMAGES from "../../Images/Images";
import { FaStar } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../email_signin/config";

const Vendor = () => {
  const { productId } = useParams();
  const [user, setUser] = useState(null);
  const [images, setImages] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

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

  const handleSubmitComment = async () => {
    // Ensure the user is logged in and newComment is not empty
    if (!newComment.trim() || newRating === 0) {
      alert("Please enter a comment and select a rating.");
      return;
    }

    try {
      // Reference to the user's comments collection
      const commentsRef = collection(db, "users", productId, "comments");

      // Add a new comment
      await addDoc(commentsRef, {
        comment: newComment,
        rating: newRating,
        // Additional fields like user's name, userImage, timestamp, etc.
        // user: "Current User's Name",
        // userImage: "URL to User's Image",
        // createdAt: serverTimestamp() // if you want to store when the comment was created
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
      }
    };

    fetchUserData();
  }, [productId]);

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {availability.map((slot, index) => (
                <button
                  key={index}
                  className={`p-4 border rounded-lg ${
                    selectedSlot === slot.id
                      ? "bg-green-500 text-white"
                      : "hover:bg-gray-900 hover:scale-125"
                  }`}
                  onClick={() => setSelectedSlot(slot.id)}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))}
            </div>
            <button className="bg-thirdColor p-2 mt-4 rounded-md w-40 text-black ">
              Reserve
            </button>
          </div>

          {/* Add Comment Section */}
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
                      index < (hoverRating || newRating) ? "#ffc107" : "#e4e5e9"
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
          {/* Comments Section */}
          <div className="mb-8 mx-8 p-4 rounded-3xl border-2 border-black shadow-2xl shadow-green-950">
            <h2 className="text-3xl mb-4">Comments and Ratings</h2>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <img
                      src={comment.userImage}
                      alt={comment.user}
                      className="w-20 h-20 rounded-full mr-4"
                    />
                    <strong>{comment.user}</strong>
                    <div className="flex ml-2">
                      {[...Array(5)].map((star, index) => (
                        <FaStar
                          key={index}
                          className="mr-1"
                          size={20}
                          color={index < comment.rating ? "#ffc107" : "#e4e5e9"}
                        />
                      ))}
                    </div>
                  </div>
                  <p>{comment.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <p>User not found</p>
      )}
    </div>
  );
};

export default Vendor;
