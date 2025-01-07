import React, { useState } from "react";

const LocationScan = () => {
  const [location, setLocation] = useState("");

  const handleScan = (e) => {
    const scannedCode = e.target.value;
    // API call to assign storage location
    console.log(`Scanned: ${scannedCode}`);
    setLocation(scannedCode);
  };

  return (
    <div>
      <h2>Location and Product Scan</h2>
      <label>
        Scan Product:
        <input type="text" onChange={handleScan} />
      </label>
      <p>Assigned Location: {location}</p>
    </div>
  );
};

export default LocationScan;
