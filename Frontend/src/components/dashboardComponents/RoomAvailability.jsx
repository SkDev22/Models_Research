import { useState } from 'react';
import { motion } from 'framer-motion';

const RoomAvailability = () => {
  const [selectedFloor, setSelectedFloor] = useState('3');
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Sample data - in a real app, this would come from your backend
  const floors = ['1', '2', '3', '4'];
  const roomTypes = {
    shared: { icon: '👥', label: 'Shared Room' },
    triple: { icon: '👥👤', label: 'Triple Room' },
    quad: { icon: '👥👥', label: 'Quad Room' }
  };

  const rooms = {
    '3': [
      { id: '301', type: 'shared', status: 'occupied', occupants: 2, maxOccupants: 2 },
      { id: '302', type: 'triple', status: 'available', occupants: 1, maxOccupants: 3 },
      { id: '303', type: 'quad', status: 'maintenance', occupants: 0, maxOccupants: 4 },
      { id: '304', type: 'shared', status: 'occupied', occupants: 2, maxOccupants: 2 },
      { id: '305', type: 'triple', status: 'available', occupants: 2, maxOccupants: 3 },
      { id: '306', type: 'shared', status: 'reserved', occupants: 0, maxOccupants: 2 }
    ]
  };

  const getStatusColor = (status) => {
    const colors = {
      available: 'bg-green-100 text-green-800',
      occupied: 'bg-blue-100 text-blue-800',
      maintenance: 'bg-red-100 text-red-800',
      reserved: 'bg-yellow-100 text-yellow-800'
    };
    return colors[status] || colors.available;
  };

  const getStatusIcon = (status) => {
    const icons = {
      available: '✅',
      occupied: '🔵',
      maintenance: '🔧',
      reserved: '⌛'
    };
    return icons[status] || '❓';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      {/* Floor Selection */}
      <div className="border-b border-gray-200 p-4">
        <h3 className="text-lg font-semibold mb-4">Floor Selection</h3>
        <div className="flex space-x-2">
          {floors.map((floor) => (
            <motion.button
              key={floor}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedFloor(floor)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedFloor === floor
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Floor {floor}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Room Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rooms[selectedFloor]?.map((room) => (
            <motion.div
              key={room.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                selectedRoom?.id === room.id ? 'border-blue-500' : 'border-gray-200'
              }`}
              onClick={() => setSelectedRoom(room)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold">Room {room.id}</h4>
                  <p className="text-sm text-gray-600 flex items-center">
                    {roomTypes[room.type].icon} {roomTypes[room.type].label}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(room.status)}`}>
                  {getStatusIcon(room.status)} {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Occupancy</span>
                  <span>{room.occupants}/{room.maxOccupants}</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${(room.occupants / room.maxOccupants) * 100}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Room Details */}
      {selectedRoom && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border-t border-gray-200 p-4"
        >
          <h3 className="text-lg font-semibold mb-4">Room Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-600">Room Information</h4>
              <ul className="mt-2 space-y-2">
                <li className="flex justify-between">
                  <span>Room Number</span>
                  <span className="font-medium">{selectedRoom.id}</span>
                </li>
                <li className="flex justify-between">
                  <span>Type</span>
                  <span className="font-medium">{roomTypes[selectedRoom.type].label}</span>
                </li>
                <li className="flex justify-between">
                  <span>Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedRoom.status)}`}>
                    {selectedRoom.status.charAt(0).toUpperCase() + selectedRoom.status.slice(1)}
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-600">Amenities</h4>
              <ul className="mt-2 space-y-2">
                <li className="flex items-center">
                  <span className="mr-2">🛏️</span>
                  <span>{selectedRoom.maxOccupants} Beds</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🚿</span>
                  <span>Attached Bathroom</span>
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📶</span>
                  <span>High-Speed WiFi</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-600">Quick Actions</h4>
              <div className="mt-2 space-y-2">
                {selectedRoom.status === 'available' && (
                  <button className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Request Room
                  </button>
                )}
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  View Floor Plan
                </button>
                <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="border-t border-gray-200 p-4">
        <h4 className="font-medium text-gray-600 mb-2">Status Legend</h4>
        <div className="flex flex-wrap gap-4">
          {Object.entries({ available: 'Available', occupied: 'Occupied', maintenance: 'Maintenance', reserved: 'Reserved' }).map(([status, label]) => (
            <div key={status} className="flex items-center">
              <span className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(status)}`} />
              <span className="text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoomAvailability;
