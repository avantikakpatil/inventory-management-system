// File: /src/components/NotFound.jsx

import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div style={{ textAlign: "center", padding: "50px" }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <Link to="/" style={{ textDecoration: "none", color: "#007bff" }}>
      Go Back Home
    </Link>
  </div>
);

export default NotFound;
