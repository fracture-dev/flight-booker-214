import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Wizard from './Wizard';

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const passengers = parseInt(searchParams.get('passengers'));
  const price = parseInt(searchParams.get('price'));
  const departure = searchParams.get('departureCity');
  const arrival = searchParams.get('destinationCity');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate');

  const handleSeatClick = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    } else if (selectedSeats.length < passengers) {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    selectedSeats.forEach((seat) => {
      const rowIndex = parseInt(seat.substring(0, seat.length - 1)) - 1;
      const isExtraLegroom = rowIndex < 3;
      const isForwardZone = rowIndex >= 3 && rowIndex < 6;
      let seatPrice = price;
      if (isExtraLegroom) {
        seatPrice += 200;
      } else if (isForwardZone) {
        seatPrice += 100;
      }
      totalPrice += seatPrice;
    });
    return totalPrice;
  };

  const calculateSeatPrice = () => {
    const seatPrice = calculateTotalPrice() - price;
    return seatPrice >= 0 ? seatPrice : 0;
  };

  const calculateTax = () => {
    const taxRate = 0.1; // Assuming a 10% tax rate
    return calculateTotalPrice() * taxRate;
  };

  const baggageFee = selectedSeats.length > 0 ? 50 : 0; // Baggage fee of $50 per passenger if seats are selected, otherwise 0
  const insuranceFee = selectedSeats.length > 0 ? 20 : 0; // Assuming an insurance fee of $20 per passenger
  const convenienceFee = selectedSeats.length > 0 ? 10 : 0; // Convenience fee of $10 if seats are selected, otherwise 0

  const totalRows = 20; // Increase the number of rows as needed

  const handleNextClick = () => {
    const totalPrice =
      calculateTotalPrice() +
      calculateTax() +
      baggageFee * passengers +
      insuranceFee * passengers +
      convenienceFee;
    navigate(
      `/add-ons?price=${totalPrice}&seats=${selectedSeats.join(
        ','
      )}&departure=${departure}&arrival=${arrival}&departureDate=${departureDate}&returnDate=${returnDate}`
    );
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
      <div className="container mx-auto p-4 mt-20">
        <Wizard id={2} />
        <h2 className="text-2xl font-bold mb-4">Seat Selection</h2>
        <div className="flex">
          <div className="w-2/3 pr-4">
            <div className="flex justify-center mb-4">
              <div className="flex items-center mr-4">
                <div className="w-4 h-4 bg-orange-500 mr-2"></div>
                <span>Extra Legroom Seat (+$200)</span>
              </div>
              <div className="flex items-center mr-4">
                <div className="w-4 h-4 bg-green-500 mr-2"></div>
                <span>Forward Zone Seat (+$100)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-gray-500 mr-2"></div>
                <span>Standard Seat</span>
              </div>
            </div>
            <div className="grid grid-cols-10 gap-2">
              {[...Array(totalRows)].map((_, rowIndex) => (
                <React.Fragment key={rowIndex}>
                  <div className="text-center">{rowIndex + 1}</div>
                  {[...Array(8)].map((_, colIndex) => {
                    const seatNumber = `${rowIndex + 1}${String.fromCharCode(65 + colIndex)}`;
                    const isExtraLegroom = rowIndex < 3;
                    const isForwardZone = rowIndex >= 3 && rowIndex < 6;
                    const isStandardSeat = rowIndex >= 6;
                    const isSelected = selectedSeats.includes(seatNumber);
                    const isMiddleColumn = colIndex === 3 || colIndex === 4;

                    if (isMiddleColumn) {
                      return (
                        <div
                          key={seatNumber}
                          className="border border-white aspect-square w-6 h-6"
                        ></div>
                      );
                    }

                    return (
                      <div
                        key={seatNumber}
                        className={`border border-gray-300 rounded cursor-pointer ${
                          isSelected
                            ? 'bg-blue-500'
                            : isExtraLegroom
                            ? 'bg-orange-500'
                            : isForwardZone
                            ? 'bg-green-500'
                            : 'bg-gray-500'
                        }`}
                        onClick={() => handleSeatClick(seatNumber)}
                      ></div>
                    );
                  })}
                  <div className="text-center">{rowIndex + 1}</div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="w-1/3">
            <div className="bg-white p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-4">Selected Seats</h3>
              {selectedSeats.length === 0 ? (
                <p>No seats selected.</p>
              ) : (
                <ul>
                  {selectedSeats.map((seat) => {
                    const rowIndex = parseInt(seat.substring(0, seat.length - 1)) - 1;
                    const isExtraLegroom = rowIndex < 3;
                    const isForwardZone = rowIndex >= 3 && rowIndex < 6;
                    let seatType = 'Standard Seat';
                    if (isExtraLegroom) {
                      seatType = 'Extra Legroom Seat';
                    } else if (isForwardZone) {
                      seatType = 'Forward Zone Seat';
                    }
                    return (
                      <li key={seat}>
                        {seat} - {seatType}
                      </li>
                    );
                  })}
                </ul>
              )}
              <hr className="my-4" />
              <p className="text-lg">
                Flight Price: <span className="font-bold">${price.toFixed(2)}</span>
              </p>
              <p className="text-lg">
                Seat Price: <span className="font-bold">${calculateSeatPrice().toFixed(2)}</span>
              </p>
              <p className="text-lg">
                Baggage Fee: <span className="font-bold">${(baggageFee * passengers).toFixed(2)}</span>
              </p>
              <p className="text-lg">
                Insurance Fee: <span className="font-bold">${(insuranceFee * passengers).toFixed(2)}</span>
              </p>
              <p className="text-lg">
                Convenience Fee: <span className="font-bold">${convenienceFee.toFixed(2)}</span>
              </p>
              <hr className="my-4" />
              <p className="text-lg">
                Subtotal:{' '}
                <span className="font-bold">
                  $
                  {(
                    calculateTotalPrice() +
                    baggageFee * passengers +
                    insuranceFee * passengers +
                    convenienceFee
                  ).toFixed(2)}
                </span>
              </p>
              <p className="text-lg">
                Tax (10%): <span className="font-bold">${calculateTax().toFixed(2)}</span>
              </p>
              <hr className="my-4" />
              <p className="text-lg">
                Total Price:{' '}
                <span className="font-bold">
                  $
                  {(
                    calculateTotalPrice() +
                    calculateTax() +
                    baggageFee * passengers +
                    insuranceFee * passengers +
                    convenienceFee
                  ).toFixed(2)}
                </span>
              </p>
              <div className="flex justify-end mt-8">
                <button
                  className="bg-custom-green text-white px-4 py-2 rounded"
                  onClick={handleNextClick}
                  disabled={selectedSeats.length === 0}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatSelection;