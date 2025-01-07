import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./InwardEntry.css";

const InwardEntry = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [products, setProducts] = useState([]); // State for storing product list
  const [showModal, setShowModal] = useState(false); // State to toggle modal visibility

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/products", formData);
      setSuccessMessage("Product added successfully!");
      setErrorMessage("");
      setFormData({ name: "", price: "", quantity: "" });
      fetchProducts(); // Refresh product list
      setShowModal(false); // Close modal after submission
    } catch (error) {
      console.error("Error adding product:", error);
      setErrorMessage("Failed to add product. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const productsFromExcel = XLSX.utils.sheet_to_json(sheet);

        for (const product of productsFromExcel) {
          await axios.post("http://localhost:5000/api/products", {
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          });
        }
        setSuccessMessage("Excel data uploaded successfully!");
        fetchProducts(); // Refresh product list
      };
      reader.readAsBinaryString(file);
    } catch (error) {
      console.error("Error uploading Excel file:", error);
      setErrorMessage("Failed to upload Excel file. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Inward Entry</h2>

      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => setShowModal(true)}>
          Manual Entry
        </button>
        <label style={styles.uploadButton}>
          Upload Excel
          <input type="file" accept=".xlsx, .xls" onChange={handleExcelUpload} style={styles.fileInput} />
        </label>
      </div>

      {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

      <h3 style={styles.subHeader}>Product List</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>ID</th>
            <th style={styles.tableHeader}>Name</th>
            <th style={styles.tableHeader}>Price</th>
            <th style={styles.tableHeader}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} style={styles.tableRow}>
              <td style={styles.tableCell}>{product.id}</td>
              <td style={styles.tableCell}>{product.name}</td>
              <td style={styles.tableCell}>{product.price}</td>
              <td style={styles.tableCell}>{product.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Manual Entry */}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3 style={styles.modalHeader}>Add Product</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label htmlFor="name" style={styles.label}>
                  Product Name:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="price" style={styles.label}>
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.inputGroup}>
                <label htmlFor="quantity" style={styles.label}>
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>
              <div style={styles.modalFooter}>
                <button type="submit" style={styles.button}>
                  Add Product
                </button>
                <button type="button" style={styles.cancelButton} onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Updated styles with modal
const styles = {
  /* Same styles as before... */
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    width: "400px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
  },
  modalHeader: {
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  modalFooter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "20px",
  },
  cancelButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#DC3545",
    color: "#fff",
    cursor: "pointer",
  },
};

export default InwardEntry;
