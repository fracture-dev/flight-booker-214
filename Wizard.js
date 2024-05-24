import React from 'react';

const Wizard = ({ id }) => {
  const steps = [
    { id: 1, label: 'Tickets' },
    { id: 2, label: 'Seats' },
    { id: 3, label: 'Add Ons' },
    { id: 4, label: 'Payment' },
    { id: 5, label: 'Confirmation' },
  ];

  return (
    <div className="flex justify-between items-center  p-4">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div className="flex items-center">
            <div
              className={`rounded-full ${
                step.id === id ? 'bg-custom-green text-white' : 'bg-gray-300 text-white'
              } w-8 h-8 flex items-center justify-center mr-2`}
            >
              {step.id}
            </div>
            <span className={step.id === id ? 'text-custom-green font-bold' : 'text-gray-500'}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className="border-t border-gray-300 flex-1 mx-4"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Wizard;