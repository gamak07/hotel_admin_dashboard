import React from 'react';
import { useAdmin } from '../Contexts/AdminProvider';

const RoomList = ({ room }) => {
    const { id, name, availableRooms, maxGuests, pricePerNight } = room;
    const { deleteRoom } = useAdmin()

    // const deleteRoom = (roomId) => {
    //     // Implement delete functionality here
    //     console.log(`Delete room with ID: ${roomId}`);
    // };

    return (
        <tr className="hover:bg-gray-100 transition-colors">
            <td className='text-black py-3 px-4 border-b'>{id}</td>
            <td className="py-3 px-4 border-b">{name}</td>
            <td className="py-3 px-4 border-b">{availableRooms}</td>
            <td className="py-3 px-4 border-b">{maxGuests}</td>
            <td className="py-3 px-4 border-b">${pricePerNight}</td>
            <td className="py-3 px-4 border-b">
                <button 
                    onClick={() => deleteRoom(room.id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
}

export default RoomList;