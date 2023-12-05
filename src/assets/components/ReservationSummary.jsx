import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../email_signin/config";
import {
  parseISO,
  isToday,
  isYesterday,
  isThisWeek,
  isThisMonth,
} from "date-fns";

const ReservationSummary = () => {
  const [yesterdayCount, setYesterdayCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [weekCount, setWeekCount] = useState(0);
  const [monthCount, setMonthCount] = useState(0);

  useEffect(() => {
    const fetchReservations = async () => {
      // Fetch all users first
      const usersSnapshot = await getDocs(collection(db, "users"));

      let yesterdayRes = 0;
      let todayRes = 0;
      let weekRes = 0;
      let monthRes = 0;

      for (const userDoc of usersSnapshot.docs) {
        // For each user, fetch their reservations
        const reservationsRef = collection(
          db,
          "users",
          userDoc.id,
          "reservations"
        );
        const reservationsSnapshot = await getDocs(reservationsRef);

        reservationsSnapshot.forEach((doc) => {
          console.log(doc.data());
          const reservationDateString = doc.data().reservationDate; // Assuming 'reservationDate' is stored as a string
          const reservationDate = parseISO(reservationDateString); // Convert the string to a Date object

          if (isYesterday(reservationDate)) {
            yesterdayRes++;
          }
          if (isToday(reservationDate)) {
            todayRes++;
          }
          if (isThisWeek(reservationDate)) {
            weekRes++;
          }
          if (isThisMonth(reservationDate)) {
            monthRes++;
          }
        });
      }

      setYesterdayCount(yesterdayRes);
      setTodayCount(todayRes);
      setWeekCount(weekRes);
      setMonthCount(monthRes);
    };

    fetchReservations();
  }, []);

  return (
    <div className="mb-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-semibold">Reservation Summary</h2>
      <div className="grid grid-cols-3 gap-4 mt-2">
        <div className="p-4 bg-blue-100 rounded-md text-center">
          <p className="text-blue-500 font-semibold">Yesterday</p>
          <p className="text-lg">{yesterdayCount} Reservations</p>
        </div>
        <div className="p-4 bg-green-100 rounded-md text-center">
          <p className="text-green-500 font-semibold">Today</p>
          <p className="text-lg">{todayCount} Reservations</p>
        </div>
        <div className="p-4 bg-yellow-100 rounded-md text-center">
          <p className="text-yellow-500 font-semibold">This Week</p>
          <p className="text-lg">{weekCount} Reservations</p>
        </div>
        <div className="p-4 bg-red-100 rounded-md text-center">
          <p className="text-red-500 font-semibold">This Month</p>
          <p className="text-lg">{monthCount} Reservations</p>
        </div>
      </div>
    </div>
  );
};

export default ReservationSummary;
