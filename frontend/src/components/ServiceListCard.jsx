import React from "react";
import { FaCut, FaCheck } from "react-icons/fa";

function ServiceListCard({ service, selected, onSelect }) {
  return (
    <div
      className="bg-gray-800 text-white p-4 rounded-xl shadow-md flex justify-between items-center hover:bg-gray-700 transition"
    >
      <div>
        <h3 className="text-lg font-semibold">{service.name}</h3>
        <p className="text-sm text-gray-400">Duration: {service.duration_minutes} min</p>
      </div>

      <button
        onClick={() => onSelect(service)}
        className={`text-xl p-2 rounded-full ${
          selected ? "bg-lime-400 text-black" : "bg-gray-700 text-white"
        }`}
      >
        {selected ? <FaCheck /> : <FaCut />}
      </button>
    </div>
  );
}

export default ServiceListCard;
