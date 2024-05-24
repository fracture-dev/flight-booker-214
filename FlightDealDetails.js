import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function FlightDealDetails() {
  const location = useLocation();

  if (!location.state) {
    // Handle the case when location.state is undefined
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Flight Deal Details</h1>
        <p className="text-gray-600 mb-4">No flight deal data available.</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go back to the home page
        </Link>
      </div>
    );
  }

  const { city, imageUrl, priceFrom, priceLabel } = location.state;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{city}</h1>
      <img src={imageUrl} alt={city} className="w-full h-64 object-cover mb-4" />
      <p className="text-gray-600 mb-2">{priceLabel}</p>
      <p className="text-gray-600">Price from: ${priceFrom}</p>
      {/* Add more details about the flight deal */}
    </div>
  );
}

export default FlightDealDetails;