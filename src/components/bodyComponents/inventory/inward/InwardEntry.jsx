import React, { useState } from "react";

const InwardEntry = () => {
  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    category: "",
    quantity: "",
    unitPrice: "",
    supplierName: "",
    reorderLevel: "",
    description: "",
    barcode: "",
    storageLocation: "",
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
    setFormData({
      productName: "",
      sku: "",
      category: "",
      quantity: "",
      unitPrice: "",
      supplierName: "",
      reorderLevel: "",
      description: "",
      barcode: "",
      storageLocation: "",
    });
    setShowForm(false); // Hide form after submission
  };

  return (
    <div>
      <h2>Inward Goods Entry</h2>
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setShowForm(true)}
          style={{ marginRight: "10px", padding: "10px 15px" }}
        >
          Manual Entry
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "15px" }}
        >
          <label>
            Product Name:
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            SKU:
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
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
            />
          </label>
          <br />
          <label>
            Unit Price:
            <input
              type="number"
              step="0.01"
              name="unitPrice"
              value={formData.unitPrice}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Supplier Name:
            <input
              type="text"
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Reorder Level:
            <input
              type="number"
              name="reorderLevel"
              value={formData.reorderLevel}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Description:
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Barcode:
            <input
              type="text"
              name="barcode"
              value={formData.barcode}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <label>
            Storage Location:
            <input
              type="text"
              name="storageLocation"
              value={formData.storageLocation}
              onChange={handleChange}
              required
            />
          </label>
          <br />
          <button type="submit" style={{ marginTop: "10px", padding: "5px 10px" }}>
            Submit
          </button>
        </form>
      )}

      <div>
        <h3>Item List</h3>
        {itemList.length > 0 ? (
          <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left" }}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Product Name</th>
                <th>SKU</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Supplier Name</th>
                <th>Reorder Level</th>
                <th>Description</th>
                <th>Barcode</th>
                <th>Storage Location</th>
              </tr>
            </thead>
            <tbody>
              {itemList.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.productName}</td>
                  <td>{item.sku}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.supplierName}</td>
                  <td>{item.reorderLevel}</td>
                  <td>{item.description}</td>
                  <td>{item.barcode}</td>
                  <td>{item.storageLocation}</td>
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
