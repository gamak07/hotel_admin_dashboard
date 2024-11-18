import React from "react";
import RoomList from "../Components/RoomList";
import { useAdmin } from "../Contexts/AdminProvider";
import Sidebar from "../Components/Sidebar";

const Rooms = () => {
  const { rooms } = useAdmin();
  console.log(rooms);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-200">
      <Sidebar />
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">Rooms List</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-4 border-b border-gray-300 text-left">
                  ID
                </th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">
                  Room
                </th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">
                  Available Rooms
                </th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">
                  Max Guests
                </th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">
                  Price
                </th>
                <th className="py-3 px-4 border-b border-gray-300 text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {rooms.length > 0 ? (
                rooms.map((room) => <RoomList key={room.id} room={room} />)
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No rooms available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
