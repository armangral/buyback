import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "src/services/supabase";

const UserProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    cnic: "",
    email: "",
  });
  const [isVerified, setIsVerified] = useState({
    email: false,
    cnic: false,
  });
  const [overallVerified, setOverallVerified] = useState(false);

  // Function to fetch user data from Supabase
  const fetchUserProfile = async () => {
    try {
      // Get the current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Fetch profile data using the user's id
      const { data: profileData, error } = await supabase
        .from("users")
        .select("name, cnic, email, verified")
        .eq("id", user.id)
        .single();

      if (error) throw error;

      // Set profile and email verification state
      setProfile({
        name: profileData.name || "",
        cnic: profileData.cnic || "",
        email: user.email || "",
      });

      setIsVerified({
        email: user.email_confirmed_at !== null, // Supabase email verification
        cnic: !!profileData.cnic, // CNIC verified if it's present
      });

      // Set overall verified status
      setOverallVerified(!!profileData.cnic && user.email_confirmed_at !== null);
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
    }
  };

  // Fetch the user profile on component mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // Regex for validating CNIC format
  const cnicRegex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;

  // Handle profile update
  const handleUpdate = async () => {
    if (!cnicRegex.test(profile.cnic)) {
      toast.error("Please enter a valid CNIC number");
      return;
    }

    try {
      // Get current user id
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;

      // Update the user's profile data
      const { error: updateError } = await supabase
        .from("users")
        .update({ name: profile.name, cnic: profile.cnic })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast.success("Profile updated successfully");

      // Reload the component by fetching updated profile data
      fetchUserProfile();  // Re-fetch user profile after update
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-10">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          User Profile
        </h2>
        <form>
          {/* Name Field */}
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

          {/* CNIC Field */}
          <div className="relative mb-6">
            <label className="block text-gray-700 text-lg mb-2">CNIC</label>
            <input
              type="text"
              name="cnic"
              value={profile.cnic}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
              placeholder="Enter your CNIC (XXXXX-XXXXXXX-X)"
              required
            />
          </div>

          {/* Email Field */}
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
              disabled
            />
          </div>

          {/* Overall Verified Status */}
          <div className="text-center mb-6">
            <span
              className={`inline-block px-4 py-2 rounded-full font-semibold text-white ${
                overallVerified ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {overallVerified ? "Fully Verified" : "Not Fully Verified"}
            </span>
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              type="button"
              onClick={handleUpdate}
              className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
