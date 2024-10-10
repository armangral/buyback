import { useState, useEffect } from "react";
import { supabase } from "src/services/supabase"; // Import Supabase client

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products that are not approved
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("approved_product", false); // Fetch products where approved_product is false

      if (error) {
        setError(error.message);
      } else {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handlePriceChange = (id, newPrice) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, price: newPrice } : product
      )
    );
  };

  const handleAccept = async (id) => {
    // Update the product to set approved_product to true
    const { error } = await supabase
      .from("products")
      .update({ approved_product: true })
      .eq("id", id);

    if (error) {
      console.error(`Error updating product ${id}:`, error.message);
    } else {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    }
  };

  const handleDiscard = async (id) => {
    // Delete the product from the database
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      console.error(`Error deleting product ${id}:`, error.message);
    } else {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    }
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products List</h1>
      <div className="space-y-4">
        {products.length === 0 ? (
          <p>No unapproved products available.</p>
        ) : (
          products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              onPriceChange={handlePriceChange}
              onAccept={handleAccept}
              onDiscard={handleDiscard}
            />
          ))
        )}
      </div>
    </div>
  );
};

const ProductItem = ({ product, onPriceChange, onAccept, onDiscard }) => {
  const [price, setPrice] = useState(product.price);

  const handleInputChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
      onPriceChange(product.id, newPrice);
    }
  };

  return (
    <div className="border rounded-lg p-4 bg-white shadow-lg flex items-start">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-24 h-24 object-cover rounded-md mr-4"
      />
      <div className="flex-grow flex justify-between items-start">
        <div className="flex-grow">
          <p className="text-gray-600">Device Details:</p>
          <p>
            <strong>Brand:</strong> {product.brand}
          </p>
          <p>
            <strong>Model:</strong> {product.model}
          </p>
          <p>
            <strong>Storage Capacity:</strong> {product.storage}
          </p>
          <p style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            <strong>Defects:</strong>
            {Object.entries(product.defects)
              .filter(([key, value]) => value) // Filter to include only true defects
              .map(([key]) => key) // Get the defect names
              .join(", ")}
          </p>
          <p>
            <strong>Condition:</strong> {product.condition}
          </p>
          <p>
            <strong>Serial Number/IMEI:</strong> {product.imei}
          </p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="text-lg font-semibold">{product.name}</p>
          <div className="flex items-center mb-2">
            <p className="text-gray-600">Price:</p>
            <input
              type="number"
              value={price}
              onChange={handleInputChange}
              className="border rounded px-2 py-1 w-24 text-center focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ml-2"
              step="0.01"
            />
          </div>
          <div className="flex">
            <button
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ease-in-out"
              onClick={() => onAccept(product.id)}
            >
              Accept
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white ml-4 font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out"
              onClick={() => onDiscard(product.id)}
            >
              Discard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
