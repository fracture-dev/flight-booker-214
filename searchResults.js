import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Wizard from './Wizard';

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const departureCity = searchParams.get('departureCity');
  const destinationCity = searchParams.get('destinationCity');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate');
  const passengers = parseInt(searchParams.get('passengers'));

  // Function to generate random flight times
  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * 24);
    const minutes = Math.floor(Math.random() * 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  // Function to generate random flight prices
  const generateRandomPrice = () => {
    const minPrice = 100;
    const maxPrice = 1000;
    return Math.floor(Math.random() * (maxPrice - minPrice + 1)) + minPrice;
  };

  // Generate dummy flights based on the search criteria
  const dummyFlights = Array.from({ length: 5 }, (_, index) => ({
    id: "FlighDreamAir",
    departureCity,
    arrivalCity: destinationCity,
    departureDate,
    departureTime: generateRandomTime(),
    returnDate,
    returnTime: generateRandomTime(),
    price: generateRandomPrice(),
    airline: `FlightDreamAir`,
  }));


  const navigate = useNavigate();

  const handleFlightSelect = (flight) => {
    navigate(`/seat-select?departureCity=${flight.departureCity}&destinationCity=${flight.arrivalCity}&departureDate=${flight.departureDate}&returnDate=${flight.returnDate}&price=${flight.price}&airline=${flight.airline}&passengers=${passengers}`);
  };

  return (
    <div>
      <header className='bg-white fixed top-0 left-0 right-0 p-4 z-10 shadow-md h-100' style={{ height: "70px" }}>
        <img src='https://cdn.discordapp.com/attachments/1240306798670643302/1242357965781209088/image.png?ex=664d8b84&is=664c3a04&hm=23f3f92a3ae1622d9b9ef1b594f63f520f05e1d5346fb1b6930fa88722b6b805&' className='h-8 mr-5' alt='Logo' />
      </header>
      <div className="container mx-auto p-4 mt-20">
        <Wizard id={1} />
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
    
        <h2 className="text-xl font-bold mt-6 mb-4">Available Flights</h2>
        {dummyFlights.length === 0 ? (
          <p>No flights found.</p>
        ) : (
          <ul>
            {dummyFlights.map((flight) => (
              <li key={flight.id} className="mb-4 border rounded-lg p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="text-lg font-bold">{flight.departureCity} - {flight.arrivalCity}</p>
                    <p className="text-gray-500">{flight.airline}</p>
                    <div className="mt-2">
                      <div className="flex items-center">
                        <p className="text-gray-500 mr-2">{flight.departureTime}</p>
                        <span className="text-gray-500">-</span>
                        <p className="text-gray-500 ml-2">{flight.returnTime}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">From ${flight.price}</p>
                    <button
                      className="mt-2 bg-custom-green text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleFlightSelect(flight)}
                    >
                      Select Flight
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchResults;