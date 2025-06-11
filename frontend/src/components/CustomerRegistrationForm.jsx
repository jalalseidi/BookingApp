import React, { useState} from "react";

function CustomerRegistrationForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("");

        fetch("/api/customers/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then(res => {
                if (!res.ok) {
                    return res.json().then(err => {
                        throw new Error(err.detail || "Failed to create customer");
                    });
                }
                return res.json();
            })
            .then(data => {
                setMessage("Registration created");
                setFormData({ name: "", email: "", phone_number: "", });
            })
            .catch(err => {
                setMessage(`❌ ${err.message}`);
            });
    };

    return (
        <div className="max-w-md mx-auto mt-6 p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Register as a Customer</h2>
      {message && <div className="mb-4 text-sm">{message}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
    );
}
export default CustomerRegistrationForm;