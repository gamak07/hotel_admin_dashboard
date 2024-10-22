import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='w-[15%] h-screen bg-gray-800 text-white shadow-lg'>
        <h2 className='text-xl font-bold p-4'>Admin Panel</h2>
        <ul className='flex flex-col space-y-2 p-4'>
            <li>
                <NavLink 
                    to='/' 
                    className={({ isActive }) => 
                        `block p-2 rounded transition duration-200 
                        ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                    }
                >
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to='/rooms' 
                    className={({ isActive }) => 
                        `block p-2 rounded transition duration-200 
                        ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                    }
                >
                    Rooms
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to='/addRooms' 
                    className={({ isActive }) => 
                        `block p-2 rounded transition duration-200 
                        ${isActive ? 'bg-gray-700' : 'hover:bg-gray-600'}`
                    }
                >
                    Add Room
                </NavLink>
            </li>
        </ul>
    </div>
  );
}

export default Sidebar;