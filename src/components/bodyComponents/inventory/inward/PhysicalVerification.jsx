import React, { useState } from "react";

const PhysicalVerification = () => {
  const [verificationData, setVerificationData] = useState([]);

  const handleVerify = (itemId) => {
    // API call to update verification status
    console.log(`Verified item with ID: ${itemId}`);
  };

  return (
    <div>
      <h2>Physical Verification</h2>
      {verificationData.map((item) => (
        <div key={item.id}>
          <p>{item.name} - {item.quantity}</p>
          <button onClick={() => handleVerify(item.id)}>Verify</button>
        </div>
      ))}
    </div>
  );
};

export default PhysicalVerification;
