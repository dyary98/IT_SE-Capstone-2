import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";

import Card from "../components/Card";
import Intro from "../components/Intro";
import Recomendations from "../components/Recomendations";
import Events from "./Events";
import Ai from "./Ai";
import Footer from "../components/Footer";
import { AvatarComp } from "../components/AvatarComp";
import IMAGES from "../../Images/Images";
import { authActions } from "../../app/AuthSlice";
import { authentication, db } from "../email_signin/config";
import CardsLoader from "../components/CardsLoader"; // Ensure you have this component
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

const useFetchUsersWithRole2 = () => {
  return useQuery({
    queryKey: ["usersWithRole2"], // Changed to an array
    queryFn: async () => {
      const vendorRef = collection(db, "vendors");
      const q = query(vendorRef);
      const querySnapshot = await getDocs(q);
      const usersData = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const userImagesRef = collection(db, "vendors", doc.id, "images");
          const imagesSnapshot = await getDocs(userImagesRef);
          const images = imagesSnapshot.docs.map((imgDoc) => imgDoc.data().url);
          return {
            uid: doc.id,
            fullName: doc.data().fullName,
            images: images.length > 0 ? images : [IMAGES.Image2], // Fallback to default image
          };
        })
      );
      console.log(usersData);
      return usersData;
    },
  });
};

const fetchUserReservations = async (userId) => {
  const reservationsRef = collection(db, "users", userId, "reservations");
  const querySnapshot = await getDocs(reservationsRef);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const UserReservations = ({ userId }) => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getReservations = async () => {
      setIsLoading(true);
      try {
        const userReservations = await fetchUserReservations(userId);
        setReservations(userReservations);
      } catch (error) {
        console.error("Error fetching reservations: ", error);
      }
      setIsLoading(false);
    };

    if (userId) {
      getReservations();
    }
  }, [userId]);

  if (isLoading) return <CardsLoader count={3} />; // Adjust count as needed for your loading component

  return (
    <div className="mb-8 p-4 bg-white shadow-lg rounded-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Your Reservations
      </h2>
      <ul className="space-y-4">
        {reservations.map((reservation) => (
          <li
            key={reservation.id}
            className="border border-gray-300 p-4 rounded-lg hover:shadow-md transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-700">
              {reservation.stadiumName}
            </h3>
            <p className="text-gray-600">
              <span className="font-medium">Start:</span>{" "}
              {reservation.startDate.toLocaleString()}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">End:</span>{" "}
              {reservation.endDate.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Home = () => {
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };
  const { t } = useTranslation();

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { data: usersWithRole2, isLoading } = useFetchUsersWithRole2();

  const handleLogout = () => {
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
      width: `${rect.width}px`,
      left: `${rect.left + window.scrollX}px`,
      top: `${rect.top + window.scrollY - 10}px`,
    };
    setLineStyle(style);
  };

  let nav = [
    { name: t("home"), link: "/" },
    { name: t("Reservation"), link: "#" },
    { name: t("map"), link: "/map" },
  ];

  return (
    <div className="bg-cover text-white bg-center object-cover bg-[url('/public/pexels-raditya-narendrasuta-11221497.jpg')] h-[155vh] m-8 rounded-3xl">
      <div className="flex w-full items-center justify-around h-[10vh]">
        <div className="flex justify-center items-center h-20 ">
          <div className="text-3xl font-bold text-blue-600">
            VENUE <span className="text-white">STATION</span>
          </div>
        </div>
        <ul className="flex justify-between w-1/4">
          {nav.map((link, index) => (
            <li key={index} onClick={() => handleLinkClick(link.name)}>
              <Link to={link.link} ref={refs[link.name]}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="w-1/4 flex justify-center">
          {user ? (
            <div className="flex rounded-full text-black pr-2 bg-gray-500 hover:bg-gray-200">
              <AvatarComp name={user.fullName} />
              <button className="p-2" onClick={handleLogout}>
                {t("log out")}
              </button>
            </div>
          ) : (
            <button className="text-white">
              <Link to="/login">{t("log in")}</Link>
            </button>
          )}
        </div>
      </div>
      <Intro />
      <div className="flex justify-around items-start h-[50vh] w-full relative">
        {isLoading ? (
          <CardsLoader count={6} />
        ) : (
          usersWithRole2.slice(2, 6).map((user) => (
            <Card
              key={user.uid}
              name={user.fullName}
              description={
                user.description
                  ? user.description
                  : "This dose not have any description"
              }
              image={user.images[0]} // The first image from the user's images
              Id={user.uid}
            />
          ))
        )}
      </div>

      <div className="flex justify-center">
        <Link
          className="bg-blue-500 w-40 text-white font-bold py-2 flex justify-center  px-4 rounded-md overflow-hidden relative shadow-lg transition duration-300 ease-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          to="/vendors"
        >
          <span className="relative z-10">See More</span>
          <div className="absolute top-0 left-0 w-full h-full bg-blue-600 scale-0 group-hover:scale-150 transition-transform origin-bottom-right"></div>
        </Link>
      </div>

      {user && <Recomendations />}
      {user && <UserReservations userId={user.uid} />}

      <Events />

      <div className="space-x-2">
        <button
          onClick={() => changeLanguage("en")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          English
        </button>
        <button
          onClick={() => changeLanguage("ku")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Kurdish
        </button>
        <button
          onClick={() => changeLanguage("ar")}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out"
        >
          Arabic
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
