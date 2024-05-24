import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import barcodeImage from './img/barcode.png'; // Import the barcode image

const Dashboard = () => {
  const [flightInfo, setFlightInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedFlightInfo = localStorage.getItem('flightInfo');
    if (storedFlightInfo) {
      setFlightInfo(JSON.parse(storedFlightInfo));
    } else {
      // Handle the case when flight info is not available
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('flightInfo');
    // Perform any additional logout actions
  };

  const downloadTicketPDF = () => {
    const doc = new jsPDF();

    // Add logo and airline name
    const logo = new Image();
    
    doc.setFontSize(16);
    doc.text('FlyDream Air', 70, 20);

    // Add flight information
    doc.setFontSize(14);
    doc.text('Flight Ticket', 10, 40);
    doc.setFontSize(12);
    doc.text(`Passenger Name: JOHN SMITH`, 10, 50);
    doc.text(`Departure: ${flightInfo.departure}`, 10, 60);
    doc.text(`Arrival: ${flightInfo.arrival}`, 10, 70);
    doc.text(`Departure Date: ${flightInfo.departureDate}`, 10, 80);
    doc.text(`Arrival Date: ${flightInfo.arrivalDate}`, 10, 90);

    // Add table for selected seats and add-ons
    const tableData = [
      ['Selected Seats', flightInfo.selectedSeats.join(', ')],
      ['Selected Add-ons', flightInfo.selectedAddOns.join(', ')],
    ];
    doc.autoTable({
      startY: 100,
      head: [['Item', 'Details']],
      body: tableData,
    });

    // Add total price
    doc.setFontSize(14);
    doc.text(`Total Price: $${flightInfo.totalPrice.toFixed(2)}`, 10, doc.lastAutoTable.finalY + 20);
    // Save the PDF
    doc.save('flight_ticket.pdf');
  };

  if (!flightInfo) {
    return null;
  }

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
        <h2 className="text-3xl font-bold mb-8">Dashboard</h2>
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">Flight Information</h3>
          <div className="ticket-container bg-blue-500 text-white rounded-lg mb-8 flex shadow-lg">
            <div className="ticket-info p-6 flex-1">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm">Passenger Name</p>
                  <p className="text-lg font-bold">JOHN SMITH</p>
                </div>
                <div>
                  <p className="text-sm">Date</p>
                  <p className="text-lg font-bold">{flightInfo.departureDate}</p>
                </div>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm">From</p>
                  <p className="text-lg font-bold">{flightInfo.departure}</p>
                </div>
                <div>
                  <p className="text-sm">To</p>
                  <p className="text-lg font-bold">{flightInfo.arrival}</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">Seat</p>
                  <p className="text-lg font-bold">{flightInfo.selectedSeats.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm">Add-ons</p>
                  <p className="text-lg font-bold">{flightInfo.selectedAddOns.join(', ')}</p>
                </div>
              </div>
              <div className="mt-8">
                <p className="text-lg font-bold">Total Price: ${flightInfo.totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <div className="barcode-container bg-white flex items-center justify-center p-4">
              <img
                src={barcodeImage}
                alt="Barcode"
                className="w-auto h-32 transform rotate-90"
              />
            </div>
          </div>
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg mr-4"
            onClick={downloadTicketPDF}
          >
            Download Ticket PDF
          </button>
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;