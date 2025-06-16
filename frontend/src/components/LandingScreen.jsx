import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCut } from "react-icons/fa";

function LandingScreen() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white h-[80vh] rounded-2xl flex flex-col justify-center items-center p-8 shadow-lg">
      {/* Logo + Icon */}
      <div className="mb-6 text-center">
        <div className="flex justify-center items-center space-x-3">
          <FaCut className="text-5xl text-lime-400" />
          <h1 className="text-3xl font-bold tracking-wide">BARBERSHOP</h1>
        </div>
        <p className="mt-2 text-sm text-gray-400 tracking-widest">
          BOOKING APPS
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col space-y-4 w-full max-w-xs">
        <button
          onClick={() => navigate("/login")}
          className="bg-lime-400 text-black py-2 rounded-full font-semibold hover:bg-lime-300"
        >
          LOG IN
        </button>
        <button
          onClick={() => navigate("/register")}
          className="border border-white text-white py-2 rounded-full font-semibold hover:bg-white hover:text-black transition"
        >
          REGISTER
        </button>
      </div>
    </div>
  );
}

export default LandingScreen;
