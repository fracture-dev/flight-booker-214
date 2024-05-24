import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Wizard from './Wizard';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const totalPrice = parseFloat(searchParams.get('price'));
  const selectedSeats = searchParams.get('seats').split(',');
  const selectedAddOns = searchParams.get('addOns').split(',');
  const departure = searchParams.get('departure');
  const arrival = searchParams.get('arrival');
  const departureDate = searchParams.get('departureDate');
  const arrivalDate = searchParams.get('returnDate');

  // just redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      saveFlightData();
      navigate('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const saveFlightData = () => {
    const flightData = {
      totalPrice,
      selectedSeats,
      selectedAddOns,
      departure,
      arrival,
      departureDate,
      arrivalDate,
    };
    localStorage.setItem('flightInfo', JSON.stringify(flightData));
  };

  const handleLoginClick = () => {
    navigate(`/login?price=${totalPrice}&seats=${selectedSeats.join(',')}&addOns=${selectedAddOns.join(',')}&departure=${departure}&arrival=${arrival}&departureDate=${departureDate}&arrivalDate=${arrivalDate}`);
  };

  return (
    <div>
      <header className="bg-white fixed top-0 left-0 right-0 p-4 z-10 shadow-md h-100" style={{ height: '70px' }}>
        <img
          src="https://cdn.discordapp.com/attachments/1240306798670643302/1242357965781209088/image.png?ex=664d8b84&is=664c3a04&hm=23f3f92a3ae1622d9b9ef1b594f63f520f05e1d5346fb1b6930fa88722b6b805&"
          className="h-8 mr-5"
          alt="Logo"
        />
      </header>
      <div className="container mx-auto p-8 mt-20">
        <Wizard id={5} />
        <div className="bg-white shadow-lg rounded-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-green-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center">
            Payment Confirmed
          </h2>
          <p className="text-lg text-center mb-8">
            Thank you for your purchase! Your payment has been successfully
            processed.
          </p>
          <div className="text-center">
            <p className="text-xl font-semibold mb-2">Order Details</p>
            <p className="text-gray-600 mb-4">
              Departure: <span className="font-bold">{departure}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Arrival: <span className="font-bold">{arrival}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Departure Date: <span className="font-bold">{departureDate}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Arrival Date: <span className="font-bold">{arrivalDate}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Selected Seats: <span className="font-bold">{selectedSeats.join(', ')}</span>
            </p>
            <p className="text-gray-600 mb-4">
              Selected Add-ons: <span className="font-bold">{selectedAddOns.join(', ')}</span>
            </p>
            <p className="text-gray-600 mb-8">
              Total Amount: <span className="font-bold">${totalPrice.toFixed(2)}</span>
            </p>
            <button
              className="bg-custom-green text-white px-6 py-2 rounded-lg"
              onClick={handleLoginClick}
            >
              Go to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;