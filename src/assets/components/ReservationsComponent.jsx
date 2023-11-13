import React, { useState, useEffect } from "react";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
  arrayUnion,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { authentication, db } from "../email_signin/config";
import IMAGES from "../../Images/Images";

const ReservationsComponent = ({ setFullName }) => {
  const [reservations, setReservations] = useState([]);
  const [userPenalties, setUserPenalties] = useState({}); // State to store penalties

  useEffect(() => {
    const fetchUserData = async () => {
      const user = authentication.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setFullName(userSnap.data().fullName || user.email); // Fallback to email if fullName not available
        }

        // Fetch reservations and penalties
        const reservationsRef = collection(
          db,
          "users",
          user.uid,
          "reservations"
        );
        const reservationsSnapshots = await getDocs(reservationsRef);
        const userReservations = reservationsSnapshots.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReservations(userReservations);

        // Initialize an object to hold penalties
        let newPenalties = {};

        for (let reservation of userReservations) {
          const userData = await getUserDataByUsername(reservation.userName);
          if (userData) {
            newPenalties[reservation.userName] = userData.penalties.length;
          }
        }

        // Set the penalties object to state
        setUserPenalties(newPenalties);
      }
    };

    fetchUserData();
  }, []);

  // Function to get user data by username
  const getUserDataByUsername = async (username) => {
    const usersRef = collection(db, "users");
    const querySnapshot = await getDocs(
      query(usersRef, where("fullName", "==", username))
    );
    const userDoc = querySnapshot.docs.find(
      (doc) => doc.data().fullName === username
    );
    if (userDoc) {
      return {
        userId: userDoc.id,
        penalties: userDoc.data().penalties || [],
      };
    } else {
      console.log("No user found with the username:", username);
      return null;
    }
  };

  // Function to handle adding a penalty and deleting the user if they have 3 penalties
  const handlePenalty = async (userName) => {
    const userData = await getUserDataByUsername(userName);
    if (userData) {
      const userRef = doc(db, "users", userData.userId);
      const penaltyRecord = {
        date: new Date().toISOString(),
        reason: "Missed Reservation",
      };

      // Update penalties in the database
      await updateDoc(userRef, {
        penalties: arrayUnion(penaltyRecord),
      });

      // Check the updated number of penalties
      const updatedPenalties = [...userData.penalties, penaltyRecord];
      const updatedPenaltiesCount = updatedPenalties.length;

      // Update penalties count in state
      setUserPenalties((prevPenalties) => ({
        ...prevPenalties,
        [userName]: updatedPenaltiesCount,
      }));

      // If penalties reach 3, delete the user
      if (updatedPenaltiesCount >= 3) {
        await deleteDoc(userRef);
        console.log(`User ${userName} has been deleted due to penalties.`);
      }
    } else {
      console.error("User not found with the username:", userName);
    }
  };

  return (
    <div>
      <section className="mb-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Reservations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {reservations.map((reservation) => (
            <div
              key={reservation.id}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {reservation.userName}
                {userPenalties[reservation.userName] > 0 && (
                  <span className="ml-2 text-red-500 text-sm">
                    <img src={IMAGES.Image8} alt="" />
                    {userPenalties[reservation.userName]} Penalties
                  </span>
                )}
              </h3>
              <p className="text-md text-gray-500 mb-4">
                <span className="font-medium">Date:</span>{" "}
                {reservation.reservationDate}
              </p>
              <p className="text-md text-gray-500 mb-4">
                <span className="font-medium">Time Slot:</span>{" "}
                {reservation.timeSlot}
              </p>
              <button
                onClick={() => handlePenalty(reservation.userName)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Penalty
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ReservationsComponent;
