import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Wizard from './Wizard';

const BaggageCard = ({ id, name, weight, price, quantity, onQuantityChange }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 flex items-center mb-4">
      <div className="mr-6">
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        {weight && <p className="text-gray-600">{weight} maximum</p>}
      </div>
      <div className="text-right">
        <span className="text-2xl font-bold">${price.toFixed(2)}</span>
        <div className="mt-2 flex items-center">
          <button
            className="bg-custom-green text-white px-3 py-1 rounded-l hover:bg-blue-600 focus:outline-none"
            onClick={() => onQuantityChange(id, Math.max(0, quantity - 1))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <span className="bg-gray-100 text-gray-800 px-4 py-1">{quantity}</span>
          <button
            className="bg-custom-green text-white px-3 py-1 rounded-r  focus:outline-none"
            onClick={() => onQuantityChange(id, quantity + 1)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v4h4a1 1 0 110 2h-4v4a1 1 0 11-2 0v-4H5a1 1 0 110-2h4V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const AddOns = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const totalPrice = parseFloat(searchParams.get('price'));
  const selectedSeats = searchParams.get('seats').split(',');
  const departure = searchParams.get('departure');
  const arrival = searchParams.get('arrival');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate');

  const [selectedAddOns, setSelectedAddOns] = useState({});

  const addOns = [
    { id: 1, name: '1 Checked Bag', weight: '23kg (50lbs)', price: 50 },
    { id: 2, name: 'Entertainment Package', price: 20 },
    { id: 3, name: 'Priority Boarding', price: 30 },
    { id: 4, name: 'Lounge Access', price: 75 },
    { id: 5, name: 'Breakfast', price: 15 },
    { id: 6, name: 'Lunch', price: 20 },
    { id: 7, name: 'Dinner', price: 25 },
    { id: 8, name: 'Alcohol Packgae', price: 70}
  ];

  const handleQuantityChange = (addOnId, quantity) => {
    setSelectedAddOns((prevSelectedAddOns) => ({
      ...prevSelectedAddOns,
      [addOnId]: quantity,
    }));
  };

  const calculateTotalAddOnsPrice = () => {
    return Object.entries(selectedAddOns).reduce((total, [addOnId, quantity]) => {
      const addOn = addOns.find((addOn) => addOn.id === parseInt(addOnId));
      return total + addOn.price * quantity;
    }, 0);
  };

  const handlePaymentClick = () => {
    const totalPriceWithAddOns = totalPrice + calculateTotalAddOnsPrice();
    const selectedAddOnsString = Object.entries(selectedAddOns)
      .filter(([_, quantity]) => quantity > 0)
      .map(([addOnId, quantity]) => `${addOnId}:${quantity}`)
      .join(',');
    navigate(`/payment?price=${totalPriceWithAddOns}&seats=${selectedSeats.join(',')}&addOns=${selectedAddOnsString}&departure=${departure}&arrival=${arrival}&departureDate=${departureDate}&returnDate=${returnDate}`);
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
        <Wizard id={3} />
        <h2 className="text-3xl font-bold mb-8">Add-Ons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {addOns.map((addOn) => (
            <BaggageCard
              key={addOn.id}
              id={addOn.id}
              name={addOn.name}
              weight={addOn.weight}
              price={addOn.price}
              quantity={selectedAddOns[addOn.id] || 0}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
        <div className="flex justify-between items-center bg-gray-100 p-6 rounded-lg">
          <p className="text-xl">
            Total Price: <span className="font-bold">${(totalPrice + calculateTotalAddOnsPrice()).toFixed(2)}</span>
          </p>
          <button
            className="bg-custom-green text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out hover:bg-blue-600"
            onClick={handlePaymentClick}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOns;