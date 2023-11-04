// src/components/Content.js
import React from "react";
import { Line, Bar, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

const Content = () => {
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

  return (
    <div className="flex-1 p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      {/* Today's Summary */}
      <div className="mb-8 p-4 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-semibold">Today's Summary</h2>
        <p className="mt-2 text-gray-600">
          Overview of today's key metrics and statistics.
        </p>
      </div>

      {/* Graphs */}
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

export default Content;
