import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

function Navbar({ onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          email: decoded.sub,
          role: decoded.role
        });
      } catch (e) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    if (onLogout) onLogout();
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <a href="/" className="hover:text-blue-300">Home</a>
<a href="/book" className="hover:text-blue-300">Services</a>
{user?.role === "barber" && (
  <>
    <a href="/availability" className="hover:text-blue-300">Set Availability</a>
    <a href="/bookings" className="hover:text-blue-300">View Bookings</a>
  </>
)}
{user?.role === "customer" && (
  <>
    <a href="/book" className="hover:text-blue-300">Book a Service</a>
    <a href="/bookings" className="hover:text-blue-300">My Bookings</a>
  </>
)}
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm italic">Welcome, {user.email.split("@")[0]}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="hover:text-blue-300">Login</a>
              <a href="/register" className="hover:text-blue-300">Register</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
