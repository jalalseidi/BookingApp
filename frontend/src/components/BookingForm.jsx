import React, { useEffect, useState } from "react";

function BookingForm() {
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
   const [formData, setFormData] = useState({
  customer_id: "",
  service_id: "",
  booking_time: "",
});
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch("/api/customers/")
            .then(res => res.json())
            .then(data => setCustomers(data));

        fetch("/api/services/")
            .then(res => res.json())
            .then(data => setServices(data));
    }, []);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("/api/bookings/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => {
                        throw new Error(err.detail || "Booking failed.");
                    });
                }
                return res.json();
            })
        .then(data => {
            setMessage("Booking created successfully.");
            setFormData({ customer_id: "", service_id: "", booking_id: "" });
        })
            .catch(err => {
                setMessage(`❌ ${err.message}`)
            });
    };
    return (
        <div className="max-w-md mx-auto mt-6 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Book a Service</h2>
      {message && <div className="mb-4">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Customer:</label>
          <select
            name="customer_id"
            value={formData.customer_id}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select a customer</option>
            {customers.map(c => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Service:</label>
          <select
            name="service_id"
            value={formData.service_id}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select a service</option>
            {services.map(s => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.duration_minutes} min)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Date & Time:</label>
          <input
            type="datetime-local"
            name="booking_time"
            value={formData.booking_time}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Book Now
        </button>
      </form>
    </div>
    )

}
export default BookingForm;