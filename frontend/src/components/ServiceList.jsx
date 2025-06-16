import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BookingForm from './BookingForm';

function ServiceList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/services/');
        setServices(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch services');
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{service.name}</h3>
                <span className="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
                  {service.duration_minutes} min
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{service.description}</p>
              
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-bold text-green-600">
                  ${service.price.toFixed(2)}
                </span>
                <div className="text-sm text-gray-500">
                  <span className="inline-block px-2 py-1 bg-gray-50 rounded">
                    Popular
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedService(service)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedService && (
        <BookingForm
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}

export default ServiceList;
