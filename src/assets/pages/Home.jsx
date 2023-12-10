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
import CardsLoader from "../components/CardsLoader";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import i18n from "../../i18n";

const useFetchUsersWithRole2 = () => {
  return useQuery({
    queryKey: ["usersWithRole2"],
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
            images: images.length > 0 ? images : [IMAGES.Image2],
          };
        })
      );
      console.log(usersData);
      return usersData;
    },
  });
};

const fetchUserReservations = async (userId) => {
  const reservationsRef = collection(db, "vendors", userId, "reservations");
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
      console.log(true);
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
  const { t } = useTranslation();

  const user = useSelector((state) => state.auth.user);
  const { data: usersWithRole2, isLoading } = useFetchUsersWithRole2();

  const refs = {
    Home: useRef(),
    Reservation: useRef(),
    About: useRef(),
  };

  return (
    <>
      {console.log("language" + i18n.language)}
      <Navbar />
      <div className="bg-cover bg-white text-white bg-center object-cover bg-[url('/public/pexels-raditya-narendrasuta-11221497.jpg')] h-[155vh] m-8 rounded-3xl">
        <Intro />
        <div className="flex justify-around items-start h-[50vh] w-full relative">
          {isLoading ? (
            <CardsLoader count={6} />
          ) : (
            usersWithRole2.slice(0, 6).map((user) => (
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

        <div className="flex justify-center my-8 w-full">
          <Link
            className="bg-blue-500 w-40 text-white font-bold py-2 flex justify-center  px-4 rounded-md overflow-hidden relative shadow-lg transition duration-300 ease-out transform hover:-translate-y-1 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            to="/vendors"
          >
            <span className="relative z-10">{t("see more")} </span>
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600 scale-0 group-hover:scale-150 transition-transform origin-bottom-right"></div>
          </Link>
        </div>

        {user && <Recomendations />}
        {user && <UserReservations userId={user.uid} />}
        <div className="text-center py-16 bg-blue-600 text-white flex justify-center flex-col items-center">
          <h1 className="text-4xl font-bold mb-2">About Us</h1>
          <p className="text-xl w-1/2 text-left">
            Welcome to Dyary, where innovation meets excellence. <br /> We are a
            dynamic team dedicated to providing exceptional services and
            products that enrich lives and empower individuals and
            organizations. <br />
            <br /> Our journey began in 2019, fueled by a vision to make a
            significant impact in our industry. Our Mission At Dyary, our
            mission is simple: to deliver outstanding solutions with a blend of
            cutting-edge technology and unmatched customer service.
            <br /> <br />
            We believe in creating value for our clients, understanding their
            needs, and exceeding their expectations. Our Vision Our vision is to
            be recognized as a leading company in our field, known for our
            innovative approach, sustainable practices, and commitment to
            excellence. We aim to set new standards, be at the forefront of
            industry advancements, and make a positive difference in the
            communities we serve.{" "}
          </p>
          <div className="flex self-start ">
            <Link
              className="bg-white p-2 ml-[350px] m-4 rounded-lg text-black text-left self-start hover:bg-blue-600 hover:text-white hover:border-2"
              to="aboutus"
            >
              Learn More
            </Link>
          </div>
        </div>
        <Events />

        <Footer />
      </div>
    </>
  );
};

export default Home;
