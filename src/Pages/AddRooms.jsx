import React, { useState } from 'react';
import { useAdmin } from '../Contexts/AdminProvider';
import Sidebar from '../Components/Sidebar'; // Assuming you have a Sidebar component

const AddRooms = () => {
  const { addRoom } = useAdmin(); // Use context values

  const [newRoom, setNewRoom] = useState({
    name: '',
    availableRooms: '',
    pricePerNight: '',
    amenities: [],
    maxGuests: '',
    description: '',
    bedType: '',
    image: '',
    roomSize: '',
  });

  // Handle input change for text, number, and textarea fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom((prev) => ({ ...prev, [name]: value }));
  };

  // Handle amenities as a comma-separated string
  const handleAmenitiesChange = (e) => {
    const amenitiesArray = e.target.value.split(',').map((item) => item.trim());
    setNewRoom((prev) => ({ ...prev, amenities: amenitiesArray }));
  };

  // Validate image URL format (optional enhancement)
  const isValidImageUrl = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png|webp)$/i);
  };

  // Handle form submission
  const handleAddRoom = (e) => {
    e.preventDefault();

    if (!isValidImageUrl(newRoom.image)) {
      alert('Please provide a valid image URL.');
      return;
    }

    addRoom(newRoom); // Call the addRoom function from context

    // Reset form
    setNewRoom({
      name: '',
      availableRooms: '',
      pricePerNight: '',
      amenities: [],
      maxGuests: '',
      description: '',
      bedType: '',
      image: '',
      roomSize: '',
    });
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-auto p-6 bg-white shadow-md rounded-lg mt-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard - Manage Rooms</h1>

        {/* Add Room Form */}
        <form onSubmit={handleAddRoom} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Room Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <input
                type="text"
                name="name"
                value={newRoom.name}
                onChange={handleInputChange}
                placeholder="Room Type"
                required
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Price per Night */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night</label>
              <input
                type="number"
                name="pricePerNight"
                value={newRoom.pricePerNight}
                onChange={handleInputChange}
                placeholder="Price"
                required
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Available Rooms */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Available Rooms</label>
              <input
                type="number"
                name="availableRooms"
                value={newRoom.availableRooms}
                onChange={handleInputChange}
                placeholder="Available Rooms"
                required
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Max Guests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
              <input
                type="number"
                name="maxGuests"
                value={newRoom.maxGuests}
                onChange={handleInputChange}
                placeholder="Max Guests"
                required
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                name="image"
                value={newRoom.image}
                onChange={handleInputChange}
                placeholder="Image URL"
                required
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Room Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Size</label>
              <input
                type="text"
                name="roomSize"
                value={newRoom.roomSize}
                onChange={handleInputChange}
                placeholder="Room Size (e.g., 200 sq ft)"
                required
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={newRoom.description}
                onChange={handleInputChange}
                placeholder="Description of the room"
                required
                rows={3}
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Bed Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bed Type</label>
              <input
                type="text"
                name="bedType"
                value={newRoom.bedType}
                onChange={handleInputChange}
                placeholder="Bed Type (e.g., King, Queen)"
                required
                className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amenities</label>
              <input
                  type="text"
                  name='amenities'
                  value={newRoom.amenities.join(', ')}
                  onChange={handleAmenitiesChange}
                  placeholder='Amenities (comma separated)'
                  required
                  className='border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-blue'
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition-colors duration-200 shadow-lg hover:shadow-xl"
          >
            Add Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRooms;