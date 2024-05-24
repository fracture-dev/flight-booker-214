import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const FlightSearch = () => {
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(`/search?departureCity=${departureCity}&destinationCity=${destinationCity}&departureDate=${departureDate}&returnDate=${returnDate}&passengers=${passengers}`);
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center space-x-4 bg-white p-4 rounded-3xl shadow-md h w-3/4">
        <div className="flex-1">
          <label htmlFor="departureCity" className="block text-sm font-medium text-gray-700">
            Departure city
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="departureCity"
              className="block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Where are you flying from?"
              value={departureCity}
              onChange={(e) => setDepartureCity(e.target.value)}
              autoComplete='off'
            />
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="destinationCity" className="block text-sm font-medium text-gray-700">
            Destination city
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="destinationCity"
              className="block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Where are you flying to?"
              value={destinationCity}
              onChange={(e) => setDestinationCity(e.target.value)}
              autoComplete='off'
            />
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700">
            Departure date
          </label>
          <div className="mt-1">
            <input
              type="date"
              id="departureDate"
              className="block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={departureDate}
              onChange={(e) => setDepartureDate(e.target.value)}
              autoComplete='off'
            />
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700">
            Return date
          </label>
          <div className="mt-1">
            <input
              type="date"
              id="returnDate"
              className="block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              autoComplete='off'
            />
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">
            Passengers
          </label>
          <div className="mt-1">
            <input
              type="text"
              id="passengers"
              className="block w-3/4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={passengers}
              onChange={(e) => setPassengers(parseInt(e.target.value))}
              autoComplete='off'
            />
          </div>
        </div>
        <button
          className="bg-custom-green hover:bg-custom-green-hover text-white font-bold p-2.5 rounded-full"
          onClick={handleSearch}
        >
          <FontAwesomeIcon icon={faArrowRight} className="h-4 w-5" />
        </button>
      </div>
    </div>
  );
};

export default FlightSearch;