import React, { useEffect, useState } from 'react';

const ReservationHistory = () => {
  const [history, setHistory] = useState([]);

  // Load reservation history from local storage
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('reservationHistory')) || [];
    setHistory(storedHistory);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Reservation History</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Total Reservations</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((entry, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{entry.date}</td>
                <td className="border border-gray-300 px-4 py-2">{entry.count}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="2"
                className="border border-gray-300 px-4 py-2 text-center text-gray-500"
              >
                No reservation history yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationHistory;
