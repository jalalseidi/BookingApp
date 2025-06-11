import React, { useEffect, useState } from "react";

function ServiceList() {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/services/')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch services');
                }
                return res.json();
            })
        .then((data) => {
            setServices(data);
            setLoading(false);
        })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading services...</p>;

    return (
    <div>
      <h2 className="text-xl font-bold mb-4">Available Services</h2>
      <ul className="space-y-2">
        {services.map((service) => (
          <li
            key={service.id}
            className="p-3 bg-gray-100 rounded-lg shadow-sm"
          >
            <div className="font-semibold">{service.name}</div>
            <div className="text-sm text-gray-600">
              Duration: {service.duration_minutes} minutes
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ServiceList;