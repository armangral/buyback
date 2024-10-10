import React, { useState, useEffect } from 'react';
import { Phone, Tablet, Laptop, Heart } from 'lucide-react';
import { supabase } from 'src/services/supabase';

const DeviceIcon = ({ type, className }) => {
    switch (type) {
        case 'smartphone': return <Phone className={className} />;
        case 'tablet': return <Tablet className={className} />;
        case 'laptop': return <Laptop className={className} />;
        default: return null;
    }
};

const DeviceCard = ({ device, onClick }) => (
    <div
        className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow border border-gray-200 cursor-pointer"
        onClick={() => onClick(device)}
    >
        <img src={device.images[0]} alt={device.model} className="w-full h-40 object-cover" />
        <div className="p-4">
            <h3 className="text-lg font-bold text-gray-800">{device.model}</h3>
            <p className="text-sm text-gray-500 mb-2">{device.brand} • {device.year_of_purchase}</p>
            <p className={`text-sm font-bold ${device.approved_product ? 'text-green-600' : 'text-red-600'}`}>
                {device.approved_product ? 'Verified' : 'Not Verified'}
            </p>
            <div className="flex justify-between items-center">
                <p className="text-lg font-bold text-purple-600">${device.price}</p>
                <button className="bg-purple-100 rounded-full p-2 hover:bg-purple-200 transition-colors">
                    <Heart className="w-4 h-4 text-purple-600" />
                </button>
            </div>
        </div>
    </div>
);

const DeviceDetails = ({ device, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(device.images[0]);

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full shadow-lg overflow-hidden">
                <div className="flex">
                    <div className="w-1/2">
                        <img src={selectedImage} alt={device.model} className="w-full h-64 object-cover rounded-md" />
                        <div className="flex mt-4 space-x-2">
                            {device.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="h-16 w-16 object-cover rounded-md cursor-pointer border-2 hover:border-purple-500"
                                    onClick={() => setSelectedImage(image)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="ml-6 flex-1">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">{device.model}</h2>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <p><strong>Brand:</strong> {device.brand}</p>
                            <p><strong>Year:</strong> {device.year_of_purchase}</p>
                            <p><strong>Condition:</strong> {device.condition} ({device.overall_rating})</p>
                            <p><strong>Storage:</strong> {device.storage}</p>
                            <p><strong>Serial Number:</strong> {device.imei}</p>
                            <p><strong>Defects:</strong> {device.defects.length > 0 ? device.defects.join(', ') : 'None'}</p>
                            <p className={`font-bold ${device.approved_product ? 'text-green-600' : 'text-red-600'}`}>
                                {device.approved_product ? 'Verified' : 'Not Verified'}
                            </p>
                        </div>
                        <div className="mt-6">
                            <p className="text-2xl font-bold text-purple-600">${device.price}</p>
                            <button className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 mt-4 transition-colors">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
                <button
                    className="mt-4 w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const MyProducts = () => {
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                // Get the current user
                const {
                    data: { user },
                    error: userError,
                } = await supabase.auth.getUser();

                if (userError) throw userError;

                // Check if the user exists
                if (!user) {
                    console.error("No user found");
                    return;
                }

                // Fetch products that match the user ID
                const { data: products, error } = await supabase
                    .from('products')
                    .select('*')
                    .eq('user_id', user.id); // Only fetch products for the logged-in user

                if (error) throw error;

                setDevices(products);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDevices();
    }, []);

    if (loading) return <p>Loading devices...</p>;
    if (error) return <p>Error fetching devices: {error}</p>;

    const featuredDevice = devices[0]; // Ensure there's at least one device

    return (
        <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
            <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">My Products List</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {devices.map(device => (
                    <DeviceCard key={device.id} device={device} onClick={setSelectedDevice} />
                ))}
            </div>

            {selectedDevice && (
                <DeviceDetails device={selectedDevice} onClose={() => setSelectedDevice(null)} />
            )}
        </div>
    );
};

export default MyProducts;