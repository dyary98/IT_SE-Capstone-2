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

export default function MapBoxJl() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("userRole", "==", 2));
      const querySnapshot = await getDocs(q);
      const usersList = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  return (
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
      {users.map((user) =>
        user.longitude && user.latitude ? (
          <React.Fragment key={user.id}>
            <Marker
              longitude={user.longitude}
              latitude={user.latitude}
              anchor="bottom"
              color="red"
              onClick={() => setSelectedUser(user)} // When marker is clicked, set the selected user
            />

            {selectedUser?.id === user.id ? ( // Check if this user's popup should be shown
              <Popup
                longitude={user.longitude}
                latitude={user.latitude}
                anchor="top"
                onClose={() => setSelectedUser(null)} // Close the popup
              >
                {user.fullName}
              </Popup>
            ) : null}
          </React.Fragment>
        ) : null
      )}
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
    </Map>
  );
}
