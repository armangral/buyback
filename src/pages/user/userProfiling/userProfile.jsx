import React, { useState } from "react";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "Saad",
    cnic: "3424324",
    email: "saadgondal203@gmail.com",
  });
  const [isVerified, setIsVerified] = useState({
    email: false,
    cnic: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleVerify = (type) => {
    setIsVerified({ ...isVerified, [type]: true });
    console.log(`${type} verified`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-10">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          User Profile
        </h2>
        <form>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="relative mb-6">
            <label className="block text-gray-700 text-lg mb-2">CNIC</label>
            <input
              type="text"
              name="cnic"
              value={profile.cnic}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              placeholder="Enter your CNIC"
              required
            />
            <button
              type="button"
              onClick={() => handleVerify("cnic")}
              className={`absolute right-4 top-12 px-3 py-1 text-sm font-medium text-white rounded-full focus:outline-none transition duration-300 ease-in-out ${
                isVerified.cnic
                  ? "bg-green-500"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isVerified.cnic ? "Verified" : "Verify"}
            </button>
          </div>
          <div className="relative mb-6">
            <label className="block text-gray-700 text-lg mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              placeholder="Enter your email"
              required
            />
            <button
              type="button"
              onClick={() => handleVerify("email")}
              className={`absolute right-4 top-12 px-3 py-1 text-sm font-medium text-white rounded-full focus:outline-none transition duration-300 ease-in-out ${
                isVerified.email
                  ? "bg-green-500"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {isVerified.email ? "Verified" : "Verify"}
            </button>
          </div>

          <div className="flex justify-center space-x-4 mt-8">
            <button
              type="button"
              className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
            >
              Update
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
