import React, { useState, useEffect } from "react";
import useFetchUsersWithRole2 from "../components/useFetchUsersWithRole2";

const Ai = ({ fetchUserReservations, userId }) => {
  const [stadiumRecommendations, setStadiumRecommendations] = useState([]);
  const { users: allStadiums, loading: loadingStadiums } =
    useFetchUsersWithRole2();

  useEffect(() => {
    const fetchStadiumRecommendations = async () => {
      if (loadingStadiums) return;

      const userReservationHistory = await fetchUserReservations(userId);

      if (userReservationHistory.length === 0) {
        setStadiumRecommendations(shuffleArray(allStadiums).slice(0, 4));
      } else {
        setStadiumRecommendations(
          findSimilarStadiums(userReservationHistory, allStadiums)
        );
      }
    };

    fetchStadiumRecommendations();
  }, [userId, allStadiums, loadingStadiums]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const findSimilarStadiums = (history, stadiums) => {
    const similarStadiums = stadiums.filter((stadium) => {
      const hasSimilarFeatures = history.some(
        (reservation) =>
          reservation.city === stadium.city ||
          reservation.rating === stadium.rating
      );
      return hasSimilarFeatures;
    });

    return similarStadiums.length > 0
      ? similarStadiums
      : shuffleArray(stadiums).slice(0, 4);
  };
  <div className="bg-black h-screen">
    {stadiumRecommendations.length > 0 ? (
      <div className="flex flex-wrap justify-center gap-4 mt-4 bg-black h-[100vh]">
        {stadiumRecommendations.map((stadium, index) => (
          <div
            key={index}
            className="bg-black border border-gray-200 rounded-lg shadow-lg p-4 w-64"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              {stadium.fullName}
            </h3>
            <p className="text-gray-600 mt-2">
              <span className="font-medium">City:</span> {stadium.city}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Rating:</span> {stadium.rating}
            </p>
            {/* Add other details you want to display */}
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-600 mt-4 bg-black h-[100vh]">
        No recommendations available at the moment.
      </p>
    )}
  </div>;
};
export default Ai;
