import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductVerification = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the backend
        axios.get("/api/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handleVerify = (id) => {
        // Mark a product as verified
        axios.patch(`/api/products/${id}/verify`)
            .then((response) => {
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product.id === id ? { ...product, verified: true } : product
                    )
                );
            })
            .catch((error) => console.error("Error verifying product:", error));
    };

    return (
        <div>
            <h1>Product Verification</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
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
