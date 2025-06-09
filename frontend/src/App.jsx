import React from 'react';
import ServiceList from './components/ServiceList';

function App() {
  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Barbershop Booking</h1>
      <ServiceList />
    </div>
  );
}

export default App;
