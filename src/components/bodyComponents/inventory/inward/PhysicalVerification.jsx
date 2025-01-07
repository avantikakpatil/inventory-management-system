import React, { useState } from "react";

const PhysicalVerification = () => {
  // Mock data for demonstration
  const [verificationData, setVerificationData] = useState([
    { id: 1, name: "Item A", quantity: 10, verified: false },
    { id: 2, name: "Item B", quantity: 5, verified: false },
    { id: 3, name: "Item C", quantity: 8, verified: false },
  ]);

  const handleVerify = async (itemId) => {
    try {
      const response = await apiCallToVerify(itemId); // Replace with actual API call
      if (response.success) {
        alert(`Item ${itemId} verified successfully!`);
        // Update state to reflect verification
      } else {
        alert("Verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying item:", error);
      alert("An error occurred during verification.");
    }
  };
  

  return (
    <div style={{ padding: "20px" }}>
      <h2>Physical Verification</h2>
      {verificationData.length === 0 ? (
        <p>No items to verify.</p>
      ) : (
        verificationData.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: item.verified ? "#d4edda" : "#f8d7da",
            }}
          >
            <p>
              <strong>{item.name}</strong> - Quantity: {item.quantity}
            </p>
            {item.verified ? (
              <p style={{ color: "green", fontWeight: "bold" }}>Verified</p>
            ) : (
              <button
                onClick={() => handleVerify(item.id)}
                style={{
                  padding: "5px 10px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Verify
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PhysicalVerification;
