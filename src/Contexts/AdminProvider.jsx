import React, { useReducer, useContext, createContext, useEffect } from 'react';

const AdminContext = createContext();

const initialState = {
  rooms: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetchRooms':
      return {
        ...state,
        rooms: action.payload,
      };
    case 'addRoom':
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
      };
    case 'deleteRoom':
      return {
        ...state,
        rooms: state.rooms.filter((room) => room.id !== action.payload),
      };
    default:
      return state; // Return current state for unknown actions
  }
};

const AdminProvider = ({ children }) => {
  const [{ rooms }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('http://localhost:5000/rooms');
        const data = await response.json();
        dispatch({ type: 'fetchRooms', payload: data });
      } catch (error) {
        console.error('Failed to fetch rooms', error);
      }
    };

    fetchRooms();
  }, []);

  // Add a new room using fetch
  const addRoom = async (newRoom) => {
    try {
      const response = await fetch('http://localhost:5000/rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRoom),
      });
      const data = await response.json();
      dispatch({ type: 'addRoom', payload: data }); // Use the added room data
      alert('Room added successfully!');
    } catch (error) {
      alert('Failed to add room: ' + error.message); // Error handling
      console.error(error);
    }
  };

  // Delete a room using fetch
  const deleteRoom = async (id) => {
    try {
      await fetch(`http://localhost:5000/rooms/${id}`, {
        method: 'DELETE',
      });
      dispatch({ type: 'deleteRoom', payload: id }); // Update state after deletion
      alert('Room deleted successfully!');
    } catch (error) {
      alert('Failed to delete room: ' + error.message); // Error handling
      console.error(error);
    }
  };

  return (
    <AdminContext.Provider
      value={{
        rooms,
        deleteRoom,
        addRoom,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    console.error('You can\'t use useAdmin out of context provider');
    return null; // Return null if context is not available
  }
  return context;
};

export { AdminProvider, useAdmin };
