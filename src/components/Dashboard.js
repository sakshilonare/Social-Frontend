import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("https://social-backend-test-lxjhvfnut-sakshilonares-projects.vercel.app/api/user/allUsers");
        setUsers(res.data);
      } catch (err) {
        alert("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  const openModal = (user) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Admin Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white p-4 rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition duration-300"
            onClick={() => openModal(user)}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{user.name}</h3>
            <div className="space-y-4">
              {user.images.slice(0, 3).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`User upload ${index}`}
                  className="w-full h-32 object-cover rounded-md"
                />
              ))}
              {user.images.length > 3 && (
                <div className="text-gray-600 text-center">+{user.images.length - 3} more</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && selectedUser && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">{selectedUser.name}'s Images</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {selectedUser.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`User upload ${index}`}
                  className="w-full h-40 object-cover rounded-md"
                />
              ))}
            </div>
            <button
              className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
