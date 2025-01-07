// File: /src/components/bodyComponents/inventory/Inventory.jsx

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import InwardEntry from "./inward/InwardEntry";
import PhysicalVerification from "./inward/PhysicalVerification";
import BarcodeGeneration from "./inward/BarcodeGeneration";
import LocationScan from "./inward/LocationScan";
import NotFound from "../../NotFound"; // Adjust the path if necessary

const Inventory = () => {
  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh", padding: "10px" }}>

      {/* Header Navigation */}
      <nav style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
        {/* Use relative paths without leading '/' */}
        <Link to="" style={linkStyle}>
          Inward Entry
        </Link>
        <Link to="physical-verification" style={linkStyle}>
          Physical Verification
        </Link>
        <Link to="barcode" style={linkStyle}>
          Barcode
        </Link>
        <Link to="location-scan" style={linkStyle}>
          Location Scan
        </Link>
      </nav>

      {/* Component Routing */}
      <Routes>
        {/* Default Route */}
        <Route path="/" element={<InwardEntry />} />
        <Route path="physical-verification" element={<PhysicalVerification />} />
        <Route path="barcode" element={<BarcodeGeneration />} />
        <Route path="location-scan" element={<LocationScan />} />

        {/* Catch-all route for invalid paths within /inventory */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

// Navigation Link Styles
const linkStyle = {
  textDecoration: "none",
  padding: "10px 20px",
  border: "1px solid #000",
  borderRadius: "5px",
  backgroundColor: "#f0f0f0",
  color: "#000",
  fontWeight: "bold",
};

export default Inventory;
