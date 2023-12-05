// src/components/Content.js
import React from "react";
import { Line, Bar, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import MapGL from "react-map-gl";
import ReservationSummary from "./ReservationSummary";
import MapBoxJl from "../pages/MapBoxJl";
import { useTranslation } from "react-i18next";

const Content = () => {
  const { t } = useTranslation();

  // Sample data for charts
  ChartJS.register(...registerables);

  const data = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Sales",
        data: [12, 19, 3, 5, 2],
        borderColor: ["rgba(75, 192, 192, 1)"],
        backgroundColor: ["rgba(75, 192, 192, 0.2)"],
      },
    ],
  };

  const [viewport, setViewport] = React.useState({
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  return (
    <div className="flex-1 pl-72 p-6">
      <h1 className="text-2xl font-semibold mb-4">{t("Dashboard")}</h1>

      {/* Today's Summary */}
      <div className="mb-8 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-semibold">{t("Today's Summary")}</h2>
        <p className="mt-2 text-gray-600">
          {t("Overview of today's key metrics and statistics.")}
        </p>
      </div>
      <ReservationSummary />
      <RecentActivity />
      <StadiumLocations />

      {/* Graphs */}
      <h1 className="mt-[200px]">{t("Stats")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold">Line Chart</h2>
          <Line data={data} />
        </div>

        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold">Bar Chart</h2>
          <Bar data={data} />
        </div>

        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold">Pie Chart</h2>
          <Pie data={data} />
        </div>

        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold">Doughnut Chart</h2>
          <Doughnut data={data} />
        </div>

        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold">Radar Chart</h2>
          <Radar data={data} />
        </div>

        <div className="bg-white p-4 shadow-md rounded-md">
          <h2 className="text-lg font-semibold">Polar Area Chart</h2>
          <PolarArea data={data} />
        </div>
      </div>
    </div>
  );
};

const RecentActivity = () => (
  <div className="mb-8 p-4 bg-white shadow-md rounded-md">
    <h2 className="text-lg font-semibold">Recent Activity</h2>
    <ul className="mt-2 space-y-2">
      <li className="p-2 bg-gray-100 rounded-md">
        <p>John Doe reserved Stadium A for 2 hours.</p>
        <p className="text-xs text-gray-500">5 minutes ago</p>
      </li>
      <li className="p-2 bg-gray-100 rounded-md">
        <p>Jane Smith cancelled her reservation for Stadium B.</p>
        <p className="text-xs text-gray-500">10 minutes ago</p>
      </li>
      {/* ... more activities */}
    </ul>
  </div>
);

const StadiumLocations = ({ viewport, setViewport }) => (
  <div className="mb-8 p-4 bg-white shadow-md rounded-md h-screen">
    <h2 className="text-lg font-semibold">Stadium Locations</h2>
    <div
      className="mt-2 w-[1100px] overflow-hidden"
      style={{ height: "600px" }}
    >
      <MapBoxJl />
    </div>
  </div>
);

export default Content;
