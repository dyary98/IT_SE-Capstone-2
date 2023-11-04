// src/components/Settings.js
import React from "react";
import {
  FaUser,
  FaCog,
  FaClipboardList,
  FaToggleOn,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";
import Sidebar from "../components/Sidebar";

const Settings = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 pl-72">
        <h1 className="text-2xl font-semibold mb-6">Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* General Settings */}
          <div className="bg-white p-6 shadow-md rounded-md">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FaCog className="text-blue-500 mr-2" /> General Settings
            </h2>
            <div className="space-y-4">
              <InputField
                label="App Name"
                placeholder="Your App Name"
                icon={<FaClipboardList className="text-green-500" />}
              />
              <InputField
                label="Contact Email"
                placeholder="contact@yourapp.com"
                icon={<FaEnvelope className="text-red-500" />}
              />
              <InputField
                label="Contact Phone"
                placeholder="+1 (123) 456-7890"
                icon={<FaPhone className="text-yellow-500" />}
              />
            </div>
          </div>

          {/* User Preferences */}
          <div className="bg-white p-6 shadow-md rounded-md">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FaUser className="text-purple-500 mr-2" /> User Preferences
            </h2>
            <div className="space-y-4">
              <InputField
                label="User Name"
                placeholder="Username"
                icon={<FaUser className="text-purple-500" />}
              />
              <InputField
                label="Email"
                placeholder="user@domain.com"
                icon={<FaEnvelope className="text-red-500" />}
              />
              <ToggleSwitch
                label="Receive Notifications"
                icon={<FaToggleOn className="text-blue-500" />}
              />
            </div>
          </div>

          {/* Reservation Policies */}
          <div className="bg-white p-6 shadow-md rounded-md">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <FaClipboardList className="text-green-500 mr-2" /> Reservation
              Policies
            </h2>
            <div className="space-y-4">
              <InputField
                label="Reservation Window"
                placeholder="30 days"
                icon={<FaClipboardList className="text-green-500" />}
              />
              <InputField
                label="Cancellation Policy"
                placeholder="Free cancellation up to 24 hours before"
                icon={<FaClipboardList className="text-green-500" />}
              />
              <ToggleSwitch
                label="Require Approval for Reservation"
                icon={<FaToggleOn className="text-blue-500" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, placeholder, icon }) => (
  <div className="flex items-center space-x-2">
    <span className="text-lg">{icon}</span>
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <input
        className="mt-1 p-2 w-full rounded-md border-2 border-gray-300 focus:border-indigo-500"
        placeholder={placeholder}
      />
    </div>
  </div>
);

const ToggleSwitch = ({ label, icon }) => (
  <div className="flex items-center justify-between space-x-2">
    <span className="text-lg">{icon}</span>
    <div className="flex-1 flex items-center justify-between">
      <span className="text-sm font-medium text-gray-600">{label}</span>
      <label className="flex items-center cursor-pointer">
        <div className="relative">
          <input type="checkbox" className="hidden" />
          <div className="toggle__line w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
          <div className="toggle__dot absolute w-6 h-6 bg-white rounded-full shadow inset-y-0 left-0"></div>
        </div>
      </label>
    </div>
  </div>
);

export default Settings;
