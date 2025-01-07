import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductVerification = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products data from the backend
        axios.get("http://localhost:5000/api/products") // Correct the URL here
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, []);

    const handleVerify = (id) => {
        // Send request to mark product as verified
        axios.patch(`http://localhost:5000/api/products/${id}/verify`) // Correct the URL here
            .then((response) => {
                // Update the state to reflect the verified status
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === id ? { ...product, verified: true } : product
                    )
                );
            })
            .catch((error) => {
                console.error("Error verifying product:", error);
            });
    };

    return (
        <div>
            <h1>Product Verification</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Created At</th>
                        <th>Verified</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td>{new Date(product.created_at).toLocaleString()}</td>
                            <td>{product.verified ? "Yes" : "No"}</td>
                            <td>
                                {!product.verified && (
                                    <button onClick={() => handleVerify(product.id)}>
                                        Verify
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductVerification;
