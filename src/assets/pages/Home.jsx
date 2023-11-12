import React from "react";
import Card from "../components/Card";
import { useState, useEffect, useRef } from "react";
import Intro from "../components/Intro";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { AvatarComp } from "../components/AvatarComp";
import IMAGES from "../../Images/Images";
import Recomendations from "../components/Recomendations";
import Events from "./Events";
import Footer from "../components/Footer";
import { authActions } from "../../app/AuthSlice";
import { collection, getDocs, query, where } from "firebase/firestore";
import { authentication, db } from "../email_signin/config"; // Adjust based on your actual path

const images = [IMAGES.Image1, IMAGES.Image2, IMAGES.Image3];
const Home = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const handelLogout = () => {
    dispatch(authActions.logout());
    signOut(authentication);
  };

  const [activeLink, setActiveLink] = useState("");
  const [lineStyle, setLineStyle] = useState({});
  const refs = {
    Home: useRef(),
    Reservation: useRef(),
    About: useRef(),
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    const rect = refs[link].current.getBoundingClientRect();
    const style = {
      width: rect.width,
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY - 10, // Adjust this value to position the line
    };
    setLineStyle(style);
  };
  let nav = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Reservation",
      link: "#",
    },
    {
      name: "Map",
      link: "/map",
    },
  ];

  const [usersWithRole2, setUsersWithRole2] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userRole", "==", 2));
      const querySnapshot = await getDocs(q);
      const users = [];
      for (let doc of querySnapshot.docs) {
        const userImagesRef = collection(db, "users", doc.id, "images");
        const imagesSnapshot = await getDocs(userImagesRef);
        const images = imagesSnapshot.docs.map((imgDoc) => imgDoc.data());
        users.push({
          uid: doc.id, // Store the document ID, which is the user's uid
          fullName: doc.data().fullName,
          images: images,
        });
      }
      setUsersWithRole2(users);
    };

    fetchUsers();
  }, []);
  return (
    <div className="bg-cover  text-white bg-center	object-cover bg-[linear-gradient(to_right_bottom,rgba(0,0,0,0.8),rgba(20,33,61,0.8)),url('/public/pexels-raditya-narendrasuta-11221497.jpg')] h-[155vh] m-8 rounded-3xl">
      <div
        className={`bg-yellow-400 h-1 rounded-full absolute transition-all ease-in-out duration-300 ${
          activeLink ? "visible" : "invisible"
        }`}
        style={lineStyle}
      ></div>
      <div className="flex w-full  items-center justify-around h-[10vh]  ">
        <div className="w-1/4 flex justify-center">AHARS</div>
        <ul className="flex justify-between w-1/4 ">
          {nav.map((link) => (
            <li key={link.name} onClick={() => handleLinkClick(link)}>
              <Link to={link.link} ref={refs[link]}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-1/4 flex justify-center">
          {user && (
            <div className="flex  rounded-full text-black pr-2 bg-gray-500 hover:bg-gray-200 ">
              <AvatarComp name={user.fullName} />
              <button className="p-2  " onClick={handelLogout}>
                LogOut
              </button>
            </div>
          )}
          {!user && (
            <button className="text-white">
              <Link to="/login">Login</Link>
            </button>
          )}
        </div>
      </div>
      <Intro />
      <div className="flex justify-around items-start h-[50vh] w-full  relative ">
        {usersWithRole2.map((user, index) => (
          <Card
            key={index}
            name={user.fullName}
            description="Fixed Description Here" // Replace with actual description if available
            image={user.images.length > 0 ? user.images[0].url : IMAGES.Image2} // Replace defaultImageUrl with a fallback image URL
            Id={user.uid}
          />
        ))}
      </div>
      {user && <Recomendations />}

      <Events />
      <Footer />
    </div>
  );
};

export default Home;
