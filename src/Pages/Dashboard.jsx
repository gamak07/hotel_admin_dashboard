import { useEffect, useState, useCallback } from 'react';
import Sidebar from '../Components/Sidebar';
import ReservationHistory from '../Components/ReservationHistory';

const Dashboard = () => {
  const [totalRooms, setTotalRooms] = useState(0);
  const [dailyCheckoutCount, setDailyCheckoutCount] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  const getTodayDate = () => new Date().toISOString().split('T')[0]; // Helper to get today's date

  // Fetch data concurrently
  const fetchData = async () => {
    try {
      const [roomsRes, bookingsRes, checkInRes] = await Promise.all([
        fetch('http://localhost:5000/rooms'),
        fetch('http://localhost:5000/bookings'),
        fetch('http://localhost:5000/checkIn')
      ]);

      if (!roomsRes.ok || !bookingsRes.ok || !checkInRes.ok) {
        throw new Error('Failed to fetch data');
      }

      const rooms = await roomsRes.json();
      const bookings = await bookingsRes.json();
      const checkIns = await checkInRes.json();

      setTotalRooms(rooms.length);
      setTotalBookings(bookings.length);
      setDailyCheckoutCount(checkIns.length);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError(error.message); // Set error message
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  const saveAndResetDailyCount = useCallback(() => {
    const today = getTodayDate();
    const newEntry = { date: today, count: dailyCheckoutCount };
    
    const storedHistory = JSON.parse(localStorage.getItem('reservationHistory')) || [];
    const updatedHistory = [...storedHistory, newEntry];

    localStorage.setItem('reservationHistory', JSON.stringify(updatedHistory));
    setDailyCheckoutCount(0); // Reset count after saving
  }, [dailyCheckoutCount]);

  const scheduleDailyReset = useCallback(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0); // Set to midnight

    const timeUntilMidnight = midnight - now;

    // Schedule reset at midnight
    setTimeout(() => {
      saveAndResetDailyCount();
      localStorage.setItem('lastCheckedDate', getTodayDate()); 
      scheduleDailyReset(); // Schedule next reset
    }, timeUntilMidnight);
  }, [saveAndResetDailyCount]);

  useEffect(() => {
    const lastCheckedDate = localStorage.getItem('lastCheckedDate');
    const today = getTodayDate();

    if (lastCheckedDate !== today) {
      saveAndResetDailyCount();
      localStorage.setItem('lastCheckedDate', today);
    }

    fetchData(); // Fetch initial data
    scheduleDailyReset(); // Schedule daily resets
  }, [saveAndResetDailyCount, scheduleDailyReset]); // Run only once on mount

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    );
  }

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

          {/* Card for Daily Reservation */}
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

        <ReservationHistory />
      </div>
    </div>
  );
};

export default Dashboard;