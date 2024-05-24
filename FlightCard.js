import React from 'react';
import { Link } from 'react-router-dom';

const FlightCard = ({ city, imageUrl, priceFrom, priceLabel }) => {
  return (
    <Link
      to={`/deals/${city}`}
      state={{ city, imageUrl, priceFrom, priceLabel }}
      className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out"
    >
      <img src={imageUrl} alt={city} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{city}</h2>
        <p className="text-gray-600">{priceLabel}</p>
      </div>
    </Link>
  );
};

export default FlightCard;