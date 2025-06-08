import React, { useEffect, useState } from 'react'

export default function ServiceList() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/services')
            .then(res => res.json())
            .then(data => setServices(data));
    }, []);

    return (
        <div>
            <h2>Available Services</h2>
            <ul>
                {services.map(servvice => (
                    <li key={servvice.id}>
                        {servvice.name} ({servvice.duration_minutes} min)
                    </li>
                ))}
            </ul>
        </div>
    );
}