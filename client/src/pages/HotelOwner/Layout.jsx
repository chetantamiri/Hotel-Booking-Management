import React, { useState } from "react";
import Navbar from "../../components/HotelOwner/Navbar";
import Sidebar from "../../components/HotelOwner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useUser } from "@clerk/clerk-react";
import HotelReg from "../../components/HotelReg";

const Layout = () => {
  const { user, isLoaded } = useUser();
  const { userData, fetchUserData } = useAppContext();
  const [showReg, setShowReg] = useState(false);

  if (!isLoaded) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-500 max-w-sm mb-6">
          Please log in to manage your hotel, rooms, and bookings.
        </p>
      </div>
    );
  }

  // If user is logged in but userData is still loading
  if (!userData) {
    return <div className="text-center py-20 text-gray-500">Loading partner settings...</div>;
  }

  const hasHotel = userData.role === "hotelOwner";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          {hasHotel ? (
            <Outlet />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Register Your Hotel</h2>
              <p className="text-gray-500 max-w-md mb-6">
                You must register your hotel to access the partner dashboard, manage rooms, and view guest bookings.
              </p>
              <button
                onClick={() => setShowReg(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition"
              >
                Register Hotel Now
              </button>
              {showReg && (
                <HotelReg
                  onClose={() => {
                    setShowReg(false);
                    fetchUserData();
                  }}
                />
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Layout;
