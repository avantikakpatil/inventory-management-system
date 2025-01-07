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
  <h2>Assigned Locations</h2>
  <ul>
    <li>{location}</li>
  </ul>
</div>

  );
};

export default LocationScan;
