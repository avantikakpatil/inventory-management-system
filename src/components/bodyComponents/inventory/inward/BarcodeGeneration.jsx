import React, { useState, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

const BarcodeGeneration = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products from the backend
  const fetchAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/products"); // API to fetch all products
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data); // Update the state with fetched data
    } catch (error) {
      setError(error.message); // Handle errors
    }
  };

  // Use useEffect hook to fetch products when the component mounts
  useEffect(() => {
    fetchAllProducts(); // Fetch products on component mount
    setLoading(false); // Set loading state to false after fetching
  }, []);

  // Function to generate barcode for a product
  const generateBarcode = (productId) => {
    const barcodeElement = document.getElementById(`barcode-${productId}`);
    JsBarcode(barcodeElement, productId.toString(), {
      format: "CODE128", // You can choose other formats
      displayValue: true, // Display the barcode value
    });
  };

  // Function to generate barcode for all products
  const generateBarcodesForAll = () => {
    products.forEach((product) => {
      generateBarcode(product.id);
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Display loading state while fetching data
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if something goes wrong
  }

  return (
    <div>
      <h1>Barcode Generation</h1>

      <button onClick={generateBarcodesForAll} style={{ marginBottom: '20px' }}>
        Generate Barcode Stickers for All Products
      </button>

      <div>
        <h2>All Products</h2>
        {products.length === 0 ? (
          <p>No products found.</p> // If no products, show this message
        ) : (
          <table border="1" cellPadding="10">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Verified</th>
                <th>Created At</th>
                <th>Barcode</th> {/* Column for Barcode */}
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.verified ? 'Yes' : 'No'}</td>
                  <td>{product.created_at}</td>
                  <td>
                    <svg
                      id={`barcode-${product.id}`} // Unique ID for each barcode
                      style={{ width: '150px', height: 'auto' }}
                    ></svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BarcodeGeneration;
