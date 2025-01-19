import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    Array.from(images).forEach((image) => {
      formData.append("images", image);
    });

    try {
      const res = await axios.post("https://social-backend-test-lxjhvfnut-sakshilonares-projects.vercel.app/api/user/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.error || "Something went wrong");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Upload User Data</h2>

      <div className="space-y-4">
        <div className="sm:col-span-3">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="block w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="block w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="sm:col-span-3">
          <label htmlFor="images" className="block text-sm font-medium text-gray-700">Images</label>
          <input
            id="images"
            type="file"
            multiple
            accept=".png"
            onChange={(e) => setImages(e.target.files)}
            required
            className="block w-full px-4 py-2 mt-1 text-gray-800 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Submit
            
          </button>
        </div>

        <div className="text-center ">
          <button className="w-full py-2 mt-4 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
          <Link
              to="/admin"  
              
            >
              Go to Dashboard
            </Link>
          </button>
          </div>
      </div>
    </form>
    </div>
  );
};

export default UserForm;
