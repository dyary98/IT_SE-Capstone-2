import * as React from "react";
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";

export default function MapBoxJl() {
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
      <Marker
        longitude={44.57}
        latitude={35.57}
        anchor="bottom"
        color="red"
      ></Marker>
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />{" "}
    </Map>
  );
}
