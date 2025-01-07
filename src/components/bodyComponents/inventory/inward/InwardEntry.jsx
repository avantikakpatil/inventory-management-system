import React, { useState } from "react";

const InwardEntry = () => {
  const [formData, setFormData] = useState({
    item: "",
    quantity: 0,
    supplier: "",
    date: "",
  });

  const [itemList, setItemList] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setItemList([...itemList, { ...formData, id: itemList.length + 1 }]);
    setFormData({ item: "", quantity: 0, supplier: "", date: "" });
    setShowForm(false); // Hide form after submission
  };

  // Handle Excel upload (Mock function for now)
  const handleExcelUpload = (e) => {
    const file = e.target.files[0];
    console.log("Excel file uploaded:", file);
    // Add logic here to parse the Excel file and update the itemList
  };

  return (
    <div>
      <h2>Inward Goods Entry</h2>
      <div style={{ marginBottom: "20px" }}>
        {/* Buttons for manual entry and Excel upload */}
        <button
          onClick={() => setShowForm(true)}
          style={{ marginRight: "10px", padding: "10px 15px" }}
        >
          Manual Entry
        </button>
        <label style={{ padding: "10px 15px", border: "1px solid black", cursor: "pointer" }}>
          Upload Excel
          <input
            type="file"
            accept=".xlsx, .xls"
            onChange={handleExcelUpload}
            style={{ display: "none" }}
          />
        </label>
      </div>

      {/* Display the form when "Manual Entry" is clicked */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "15px" }}>
          <label>
            Item Name:
            <input
              type="text"
              name="item"
              value={formData.item}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", marginBottom: "10px" }}
            />
          </label>
          <br />
          <label>
            Quantity:
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", marginBottom: "10px" }}
            />
          </label>
          <br />
          <label>
            Supplier:
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", marginBottom: "10px" }}
            />
          </label>
          <br />
          <label>
            Date:
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              style={{ marginLeft: "10px", marginBottom: "10px" }}
            />
          </label>
          <br />
          <button type="submit" style={{ marginTop: "10px", padding: "5px 10px" }}>
            Submit
          </button>
        </form>
      )}

      {/* Display the item list */}
      <div>
        <h3>Item List</h3>
        {itemList.length > 0 ? (
          <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.item}</td>
                  <td>{item.quantity}</td>
                  <td>{item.supplier}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No items added yet.</p>
        )}
      </div>
    </div>
  );
};

export default InwardEntry;
