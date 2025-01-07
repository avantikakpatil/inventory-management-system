import React, { useState, useEffect } from "react";

const LocationScan = () => {
  const [products, setProducts] = useState([]);
  const [locationMap, setLocationMap] = useState({});
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Fetch all products from the backend
  const fetchAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data); // Update the products state
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle location change for each product
  const handleLocationChange = (id, location) => {
    setLocationMap(prevMap => ({
      ...prevMap,
      [id]: location,
    }));
  };

  // Update location in the database
  const updateLocation = async (id) => {
    const location = locationMap[id];
    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}/location`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ location }),
      });

      if (!response.ok) {
        throw new Error("Failed to update location");
      }

      const data = await response.json();
      setSuccessMessage(data.message); // Success message after updating location
    } catch (error) {
      setError(error.message); // Handle errors
    }
  };

  // Use useEffect to fetch products when the component mounts
  useEffect(() => {
    fetchAllProducts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>Loading products...</div>;
  }

  return (
    <div>
      <h2>Assign Locations to Products</h2>

      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Current Location</th>
            <th>Assign Location</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.location || "Not assigned"}</td>
              <td>
                <input
                  type="text"
                  value={locationMap[product.id] || ""}
                  onChange={(e) => handleLocationChange(product.id, e.target.value)}
                  placeholder="Enter location"
                />
              </td>
              <td>
                <button onClick={() => updateLocation(product.id)}>Update Location</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LocationScan;
