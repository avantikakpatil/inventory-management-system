import React, { useEffect, useState } from "react";
import axios from "axios";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products");
                setProducts(res.data);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price} (Qty: {product.quantity})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
