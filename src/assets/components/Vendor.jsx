import React, { useState } from "react";
import IMAGES from "../../Images/Images";
import { FaStar } from "react-icons/fa";
import { ImLocation } from "react-icons/im";
import { useParams } from "react-router-dom";

const Vendor = () => {
  const { productId } = useParams();
  const [selectedSlot, setSelectedSlot] = useState(null);

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

  let products = [
    {
      ID: 1,
      name: "Twimalik Stadium",
      location: "Sulaimany",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae officiis fugit perspiciatis ad nisi culpa cupiditate assumenda harum saepe totam!",
      image: `${IMAGES.Image1}`,
      price: "20, 000 IQD",
    },
    {
      ID: 2,
      name: "Hawkary Stadium",
      location: "Sulaimany",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto reiciendis maiores aliquid, magni accusantium nobis?",
      image: `${IMAGES.Image2}`,
      price: "25, 000 IQD",
    },
    {
      ID: 3,
      name: "Azadi Mili Stadium",
      location: "Sulaimany",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto reiciendis maiores aliquid, magni accusantium nobis?",
      image: `${IMAGES.Image3}`,
      price: "20, 000 IQD",
    },
  ];
  const timeSlots = [
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    // ... Add more as needed
  ];

  const product = products.find((p) => p.ID === parseInt(productId));

  return (
    <div className="container mx-auto p-4">
      {product ? (
        <>
          <div className="w-full h-[60vh] flex justify-center items-center ">
            <img
              src={product.image}
              alt={product.name}
              className="w-full m-8 h-full object-cover rounded-lg shadow-lg  shadow-green-950"
            />
          </div>
          <div className=" shadow-green-950 flex flex-col mx-8 border-2 border-black rounded-3xl my-8 p-8 shadow-2xl p">
            <h1 className="text-5xl mt-4 mr-8 mb-2">{product.name}</h1>
            <div className="flex items-center">
              <h1 className="text-2xl mt-6 mr-8 mb-2">{product.price}</h1>
              <h1 className="text-2xl mt-6 mb-2 flex">
                <ImLocation className="mr-1" size={40} /> {product.location}
              </h1>
            </div>
            <p className="text-lg mb-8">{product.description}</p>
          </div>
          <div className="mb-8 bg-primaryColor p-8 rounded-3xl text-white mx-8 shadow-2xl shadow-white">
            <h2 className="text-3xl mb-4">Available Time Slots</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`p-4 border rounded-lg ${
                    selectedSlot === slot
                      ? "bg-green-500 text-white"
                      : "hover:bg-gray-900 hover:scale-125"
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
            <button className="bg-thirdColor p-2 mt-4 rounded-md w-40 text-black ">
              Reserve
            </button>
          </div>
          <div className="mb-8 mx-8    p-4 rounded-3xl border-2 border-black shadow-2xl shadow-green-950">
            <h2 className="text-3xl mb-4">Comments and Ratings</h2>
            <ul>
              {comments.map((comment) => (
                <li key={comment.id} className="mb-4 p-4 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <img
                      src={comment.userImage}
                      alt={comment.user}
                      className="w-20 h-20 rounded-full mr-4" // Adjust the size as needed
                    />
                    <strong>{comment.user}</strong>{" "}
                    <div className="flex ml-2">
                      {[...Array(5)].map((star, index) => {
                        const ratingValue = index + 1;
                        return (
                          <label key={index}>
                            <FaStar
                              className="mr-1"
                              size={20}
                              color={
                                ratingValue <= comment.rating
                                  ? "#ffc107"
                                  : "#e4e5e9"
                              }
                            />
                          </label>
                        );
                      })}
                    </div>
                  </div>
                  <p>{comment.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <h1 className="text-4xl mt-4">Product not found</h1>
      )}
    </div>
  );
};

export default Vendor;
