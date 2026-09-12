import React, { useState, useEffect } from "react";

function AdminProduct() {
  // Show / hide form
  const [showForm, setShowForm] = useState(false);

  // Products
  const [products, setProducts] = useState([]);

  // Edit ID
  // null = Add Product
  // id = Edit Product
  const [editId, setEditId] = useState(null);

  // Product form
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    category: "",
  });

  // ==========================================
  // GET ALL PRODUCTS
  // ==========================================

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/flower");

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setProducts(data.data);
      } else {
        alert(data.error || "Failed to fetch products");
      }
    } catch (err) {
      console.log(err);
      alert("Unable to connect to server");
    }
  };

  // Fetch products when page loads
  useEffect(() => {
    fetchProducts();
  }, []);

  // ==========================================
  // HANDLE INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // ADD / UPDATE PRODUCT
  // ==========================================

  const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("editId:", editId);
  console.log("product:", product);

  try {
    let response;

    if (editId !== null) {
      response = await fetch(
        `http://localhost:8000/api/flower/${editId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
    } else {
      response = await fetch(
        "http://localhost:8000/api/flower",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
    }

    // Read response as text first
    const text = await response.text();

    console.log("Status:", response.status);
    console.log("Server response:", text);

    let data;

    try {
      data = JSON.parse(text);
    } catch (err) {
      throw new Error(
        "Server returned HTML instead of JSON. Check your backend PUT route."
      );
    }

    if (!response.ok) {
      throw new Error(
        data.error || "Operation failed"
      );
    }

    if (editId !== null) {
      alert("Product updated successfully");
    } else {
      alert("Product added successfully");
    }

    setProduct({
      name: "",
      price: "",
      image: "",
      category: "",
    });

    setEditId(null);
    setShowForm(false);

    fetchProducts();

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    alert(err.message);
  }
};

  // ==========================================
  // EDIT PRODUCT
  // ==========================================

  const EditProduct = (item) => {
    // Put existing product data into form
    setProduct({
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });

    // Store ID
    setEditId(item.id);

    // Open form
    setShowForm(true);
  };

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const DeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/api/flower/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to delete product");
      }

      alert(data.message);

      // Remove product from UI
      setProducts((oldProducts) =>
        oldProducts.filter((item) => item.id !== id),
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // ==========================================
  // OPEN ADD PRODUCT FORM
  // ==========================================

  const openAddForm = () => {
    // Make sure we are not in edit mode
    setEditId(null);

    // Empty form
    setProduct({
      name: "",
      price: "",
      image: "",
      category: "",
    });

    // Show form
    setShowForm(true);
  };

  // ==========================================
  // CANCEL FORM
  // ==========================================

  const cancelForm = () => {
    setShowForm(false);

    setEditId(null);

    setProduct({
      name: "",
      price: "",
      image: "",
      category: "",
    });
  };

  return (
    <>
      {/* ==========================================
          ADD / EDIT FORM
      ========================================== */}

      {showForm && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">
            {/* Form Header */}

            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">
                {editId !== null ? "Edit Product" : "Add New Product"}
              </h5>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={cancelForm}
              >
                ✕ Close
              </button>
            </div>

            {/* Form */}

            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                {/* =================================
                    PRODUCT NAME
                ================================= */}

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Product Name</label>

                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* =================================
                    PRICE
                ================================= */}

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Price</label>

                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="1499"
                    required
                  />
                </div>

                {/* =================================
                    IMAGE
                ================================= */}

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Image</label>

                  <input
                    type="text"
                    name="image"
                    value={product.image}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="./s27.png"
                    required
                  />
                </div>

                {/* =================================
                    CATEGORY
                ================================= */}

                <div className="col-md-6">
                  <label className="form-label fw-semibold">Category</label>

                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select Category</option>

                    <option value="Roses">Roses</option>

                    <option value="Bouquets">Bouquets</option>

                    <option value="Wedding">Wedding</option>

                    <option value="Gifts">Gifts</option>
                  </select>
                </div>

                {/* =================================
                    BUTTONS
                ================================= */}

                <div className="col-12 mt-4">
                  <button type="submit" className="btn btn-dark px-4 me-2">
                    {editId !== null ? "Update Product" : "Add Product"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    onClick={cancelForm}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==========================================
          PRODUCT TABLE
      ========================================== */}

      <div className="card border-0 shadow-sm">
        <div className="card-body">
          {/* Table Header */}

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0">Products</h5>

            <button className="btn btn-dark btn-sm" onClick={openAddForm}>
              + Add Product
            </button>
          </div>

          {/* Table */}

          <div className="table-responsive">
            <table className="table align-middle">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  {/* <th>Stock</th> */}
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {products.length > 0 ? (
                  products.map((item) => (
                    <tr key={item.id}>
                      {/* ID */}

                      <td>{item.id}</td>

                      {/* NAME */}

                      <td className="fw-bold">{item.name}</td>

                      {/* CATEGORY */}

                      <td>
                        <span className="badge bg-light text-dark border">
                          {item.category}
                        </span>
                      </td>

                      {/* PRICE */}

                      <td>₹{item.price}</td>

                      {/* ACTION */}

                      <td>
                        {/* EDIT */}

                        <button
                          className="btn btn-sm btn-outline-dark me-2"
                          onClick={() => EditProduct(item)}
                        >
                          Edit
                        </button>

                        {/* DELETE */}

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => DeleteProduct(item.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProduct;
