import { useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

export default function CreateProductForm() {
  const [images, setImages] = useState([]);
  const [condition, setCondition] = useState("");
  const [overallRating, setOverallRating] = useState(5);
  const [defects, setDefects] = useState({
    screenCrack: false,
    batteryIssue: false,
    buttonsMalfunction: false,
    speakerIssue: false,
    cameraDamage: false,
  });

  const storageOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"];
  const conditionOptions = ["New", "Like New", "Good", "Fair", "Poor"];

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((currentImages) => {
        const updatedImages = [...currentImages, ...newImages];
        return updatedImages.slice(0, 3); // Limit to 3 images
      });
    }
  };

  const removeImage = (indexToRemove) => {
    setImages((currentImages) =>
      currentImages.filter((_, index) => index !== indexToRemove)
    );
  };

  return (
    <>
      <div className="bg-white rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">Device Information</h2>

        <div className="grid grid-cols-2 gap-6">
          {/* Existing fields remain the same */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Brand
            </label>
            <input
              type="text"
              placeholder="e.g., Apple, Samsung"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <input
              type="text"
              placeholder="e.g., iPhone 13 Pro, Galaxy S21"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* New Overall Condition Rating field */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Overall Condition Rating (1-10)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="1"
                max="10"
                value={overallRating}
                onChange={(e) => setOverallRating(e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="text-lg font-semibold w-8">{overallRating}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>Poor</span>
              <span>Excellent</span>
            </div>
          </div>

          {/* Existing fields continue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Year of Purchase
            </label>
            <input
              type="number"
              placeholder="e.g., 2022"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Serial Number / IMEI
            </label>
            <input
              type="text"
              placeholder="Enter device identifier"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* More existing fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
            >
              <option value="">Select condition</option>
              {conditionOptions.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Storage Capacity
            </label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Select storage</option>
              {storageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Defects section - same as before */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Defects
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(defects).map(([key, value]) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() =>
                      setDefects((prev) => ({ ...prev, [key]: !prev[key] }))
                    }
                    className="rounded text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase())}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Updated Image Upload section */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Device Images (Max 3)
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
              <div className="space-y-1 text-center">
                <IoCameraOutline className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500">
                    <span>Upload images</span>
                    <input
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB ({3 - images.length} remaining)
                </p>
              </div>
            </div>
            {images.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Device image ${index + 1}`}
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
                    >
                      <RxCross2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button className="px-6 py-2 bg-indigo-900 text-white rounded-lg hover:bg-indigo-800 transition-colors">
            Next
          </button>
        </div>
      </div>
    </>
  );
}
