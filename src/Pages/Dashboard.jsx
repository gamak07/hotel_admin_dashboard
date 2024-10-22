import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';

const Dashboard = () => {
  const [totalRooms, setTotalRooms] = useState(0);
  const [dailyCheckoutCount, setDailyCheckoutCount] = useState(''); // Static value, you might want to calculate this dynamically.
  const [totalBookings, setTotalBookings] = useState(0);

  useEffect(() => {
    const getRoomNumber = async () => {
      const res = await fetch('http://localhost:5000/rooms');
      const data = await res.json();
      setTotalRooms(data.length);
    };
    getRoomNumber();
  }, []);

  useEffect(() => {
    const getTotalBooking = async () => {
      const res = await fetch('http://localhost:5000/bookings');
      const data = await res.json();
      setTotalBookings(data.length);

     
    };
    getTotalBooking();
  }, []); // Add today as a dependency to recalculate when it changes

  const fetchDailyCheckoutCount = async () => {
    const res = await fetch('http://localhost:5000/checkIn');
    const data = await res.json();
    setDailyCheckoutCount(data.length);
};

useEffect(() => {
    fetchDailyCheckoutCount();

    const interval = setInterval(() => {
        const now = new Date();
        const lastCheckedDate = localStorage.getItem('lastCheckedDate');
        if (lastCheckedDate !== now.toISOString().split('T')[0]) {
            // If the date has changed, reset the count
            setDailyCheckoutCount(0);
            localStorage.setItem('lastCheckedDate', now.toISOString().split('T')[0]);
        }
    }, 1000 * 60 * 60); // Check every hour

    return () => clearInterval(interval); // Clean up on unmount
}, []);
  return (
    <div className="flex h-screen overflow-hidden bg-gray-200">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card for Total Rooms */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Rooms</h2>
            <p className="text-2xl font-bold">{totalRooms}</p>
          </div>

          {/* Card for Available Rooms */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Daily Reservation</h2>
            <p className="text-2xl font-bold">{dailyCheckoutCount}</p>
          </div>

          {/* Card for Total Bookings */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Total Bookings</h2>
            <p className="text-2xl font-bold">{totalBookings}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
