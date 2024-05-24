import React from 'react';

const Wizard = () => {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-4">
      <div className="flex items-center">
        <div className="rounded-full bg-blue-500 text-white w-8 h-8 flex items-center justify-center mr-2">
          1
        </div>
        <span className="text-blue-500 font-bold">Seats</span>
      </div>
      <div className="border-t border-gray-300 flex-1 mx-4"></div>
      <div className="flex items-center">
        <div className="rounded-full bg-gray-300 text-white w-8 h-8 flex items-center justify-center mr-2">
          2
        </div>
        <span className="text-gray-500">Tickets</span>
      </div>
      <div className="border-t border-gray-300 flex-1 mx-4"></div>
      <div className="flex items-center">
        <div className="rounded-full bg-gray-300 text-white w-8 h-8 flex items-center justify-center mr-2">
          3
        </div>
        <span className="text-gray-500">Payment</span>
      </div>
      <div className="border-t border-gray-300 flex-1 mx-4"></div>
      <div className="flex items-center">
        <div className="rounded-full bg-gray-300 text-white w-8 h-8 flex items-center justify-center mr-2">
          4
        </div>
        <span className="text-gray-500">Confirmation</span>
      </div>
    </div>
  );
};

export default Wizard;