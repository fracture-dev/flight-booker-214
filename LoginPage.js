import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginPage = () => {
  // State variables for username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Navigation and location hooks from react-router-dom
  const navigate = useNavigate();
  const location = useLocation();

  // Event handler for username input change
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  // Event handler for password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // useEffect hook to retrieve flight data from URL query params and store it in local storage
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const totalPrice = parseFloat(searchParams.get('price'));
    const selectedSeats = searchParams.get('seats')?.split(',') || [];
    const selectedAddOns = searchParams.get('addOns')?.split(',') || [];
    const departure = searchParams.get('departure') || '';
    const arrival = searchParams.get('arrival') || '';
    const departureDate = searchParams.get('departureDate') || '';
    const arrivalDate = searchParams.get('arrivalDate') || '';
  
    const flightData = {
      totalPrice: totalPrice || 0,
      selectedSeats,
      selectedAddOns,
      departure,
      arrival,
      departureDate,
      arrivalDate,
    };
  
    localStorage.setItem('flightInfo', JSON.stringify(flightData));
  }, [location.search]);

  // Event handler for login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'xyz007' && password === 'abcd') {
      // Login successful, navigate to the dashboard page
      navigate('/dashboard');
    } else {
      // Login failed, set error message
      setError('wrong password; dummy user: xyz007 pass: abcd');
    }
  };

  return (

    <div className="flex flex-col min-h-screen relative">
    <div 
      className="absolute inset-0 bg-cover bg-center z-0"
      style={{ backgroundImage: "url('https://flyrst.com/wp-content/uploads/bb-plugin/cache/Plane-Nose-1024x685-panorama-c39c1c41a1c0335e3f48c23e781b8b91-5dc0a555d2dc7.jpg')", 
               backgroundPosition: "center right -45px"
       }}
    ></div>
    <div className="absolute inset-0 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm z-0"></div>
    <header className='bg-white fixed top-0 left-0 right-0 p-4 z-10 shadow-md h-100' style={{ height: "70px" }}>
      <img src='https://cdn.discordapp.com/attachments/1240306798670643302/1242357965781209088/image.png?ex=664d8b84&is=664c3a04&hm=23f3f92a3ae1622d9b9ef1b594f63f520f05e1d5346fb1b6930fa88722b6b805&' className='h-8 mr-5' alt="Logo" />
    </header>
    <div className="flex-grow flex items-center justify-center z-10 p-8">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={handleUsernameChange}
              autoComplete='off'
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          {error && <p className="text-red-500 mb-6">{error}</p>}
          <button
            type="submit"
            className="w-full bg-custom-green text-black font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default LoginPage;