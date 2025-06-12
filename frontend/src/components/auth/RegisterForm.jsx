import React, { useState } from "react";

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.detail || "Something went wrong");
            }

            localStorage.setItem("token", data.access_token);

            setMessage("Register successful");
        } catch (err) {
            setMessage(`❌ ${err.message}`);
        }
    };
    return (
        <div className="max-w-md mx-auto p-4 border rounded mt-6">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      {message && <p className="mb-4 text-sm">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        >
          <option value="customer">Customer</option>
          <option value="barber">Barber</option>
        </select>
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
    );
}

export default RegisterForm;