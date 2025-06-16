import React from "react";
import ServiceList from "../components/ServiceList";

function Home() {
  return (
    <div className="max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-bold text-white mb-4">Select a Service</h2>
      <ServiceList />
    </div>
  );
}

export default Home;
