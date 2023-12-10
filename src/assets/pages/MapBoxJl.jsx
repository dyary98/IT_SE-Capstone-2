import React, { useState, useEffect } from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../email_signin/config"; // Adjust the import path as needed
import Navbar from "../components/Navbar";

export default function MapBoxJl() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUserPosition, setCurrentUserPosition] = useState(null);
  const [radius, setRadius] = useState(10); // Default radius set to 10 km

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentUserPosition({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (err) => {
        console.error(err);
      }
    );

    const fetchUsers = async () => {
      const usersRef = collection(db, "vendors");
      const q = query(usersRef);
      const querySnapshot = await getDocs(q);
      const usersList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  // Function to calculate distance between two coordinates
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1);
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  const usersWithinRadius = users.filter((user) => {
    if (!currentUserPosition || !user.latitude || !user.longitude) return false;
    const distance = getDistanceFromLatLonInKm(
      currentUserPosition.latitude,
      currentUserPosition.longitude,
      user.latitude,
      user.longitude
    );
    return distance <= radius;
  });

  return (
    <>
      <Navbar />
      <Map
        mapboxAccessToken="pk.eyJ1IjoiZHlhcnkwMTciLCJhIjoiY2wxaDhtams2MGJrcTNqbjJ5N2s2bTh5diJ9.cidFRjA1obU6y8MoJTy3RA"
        initialViewState={{
          longitude: 44.57,
          latitude: 35.57,
          zoom: 6.5,
          height: "100vh",
          width: "100%",
        }}
        style={{ width: 1480, height: 750 }}
        mapStyle="mapbox://styles/mapbox/dark-v9"
      >
        {usersWithinRadius.map((user) =>
          user.longitude && user.latitude ? (
            <React.Fragment key={user.id}>
              <Marker
                longitude={user.longitude}
                latitude={user.latitude}
                anchor="bottom"
                color="red"
                onClick={(event) => {
                  // Prevent map click event from firing
                  event.originalEvent.stopPropagation();
                  setSelectedUser(user);
                }}
              />

              {selectedUser?.id === user.id ? ( // Check if this user's popup should be shown
                <Popup
                  longitude={user.longitude}
                  latitude={user.latitude}
                  anchor="top"
                  onClose={() => setSelectedUser(null)} // Close the popup
                  className="w-[200px] h-[100px]"
                >
                  {user.fullName} <br />
                  {user.phoneNumber}
                  <br />
                  {user.stadiumSize}
                  <br />
                  {user.price}
                  <br />
                </Popup>
              ) : null}
            </React.Fragment>
          ) : null
        )}
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {/* Radius Control */}
        <div
          className="text-xl"
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <label htmlFor="radius">Radius (km): </label>
          <input
            id="radius"
            type="number"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
            className="w-[100px] h-[50px] text-xl"
            style={{ width: "60px", marginRight: "10px" }}
          />
        </div>
      </Map>
    </>
  );
}
