import React from "react";
import BookingForm from "./components/BookingForm";
import ServiceList from "./components/ServiceList";
import CustomerRegistrationForm from "./components/CustomerRegistrationForm.jsx";

function App() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Barbershop Booking</h1>
      <BookingForm />
      <CustomerRegistrationForm />
      <hr className="my-6" />
      <ServiceList />
    </div>
  );
}

export default App;
