import React, { useState, useEffect, useRef } from "react";

function AdminProduct() {
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: null,
    category: "",
  });

  const fileRef = useRef(null);

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/flower"
      );

      const data = await response.json();

      console.log("Products:", data);

      if (response.ok) {
        setProducts(data.data || []);
      } else {
        alert(data.error || "Failed to fetch products");
      }
    } catch (err) {
      console.error(err);
      alert("Unable to connect to server");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setProduct({
        ...product,
        image: files[0],
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("category", product.category);

      // Only append image if a new image is selected
      if (product.image instanceof File) {
        formData.append("image", product.image);
      }

      let response;

      if (editId !== null) {
        // UPDATE
        response = await fetch(
          `http://localhost:8000/api/flower/${editId}`,
          {
            method: "PUT",
            body: formData,
          }
        );
      } else {
        // ADD
        if (!(product.image instanceof File)) {
          alert("Please select an image");
          return;
        }

        response = await fetch(
          "http://localhost:8000/api/flower",
          {
            method: "POST",
            body: formData,
          }
        );
      }

      const text = await response.text();

      console.log("Status:", response.status);
      console.log("Server response:", text);

      let data;

      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error(
          "Server returned invalid JSON. Check your backend route."
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Operation failed"
        );
      }

      if (editId !== null) {
        alert("Product updated successfully");
      } else {
        alert("Product added successfully");
      }

      // Reset form
      resetForm();

      // Refresh products
      fetchProducts();
    } catch (err) {
      console.error("PRODUCT ERROR:", err);
      alert(err.message);
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================
  const EditProduct = (item) => {
    setProduct({
      name: item.name || "",
      price: item.price || "",
      image: null,
      category: item.category || "",
    });

    setEditId(item.id);
    setShowForm(true);

    // Clear file input
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const DeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/flower/${id}`,
        {
          method: "DELETE",
        }
      );

      const text = await response.text();

      let data;

      try {
        data = JSON.parse(text);
      } catch (err) {
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Failed to delete product"
        );
      }

      alert(data.message || "Product deleted successfully");

      setProducts((oldProducts) =>
        oldProducts.filter((item) => item.id !== id)
      );
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setProduct({
      name: "",
      price: "",
      image: null,
      category: "",
    });

    setEditId(null);
    setShowForm(false);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  // =========================
  // OPEN ADD FORM
  // =========================
  const openAddForm = () => {
    setEditId(null);

    setProduct({
      name: "",
      price: "",
      image: null,
      category: "",
    });

    if (fileRef.current) {
      fileRef.current.value = "";
    }

    setShowForm(true);
  };

  // =========================
  // CANCEL
  // =========================
  const cancelForm = () => {
    resetForm();
  };

  return (
    <>
      {/* =========================
          FORM
      ========================= */}
      {showForm && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body p-4">

            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">
                {editId !== null
                  ? "Edit Product"
                  : "Add New Product"}
              </h5>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={cancelForm}
              >
                ✕ Close
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="row g-3">

                {/* NAME */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Product Name
                  </label>

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

                {/* PRICE */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Price
                  </label>

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

                {/* IMAGE */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Image
                  </label>

                  <input
                    type="file"
                    name="image"
                    ref={fileRef}
                    onChange={handleChange}
                    className="form-control"
                    accept="image/*"
                    required={editId === null}
                  />

                  {editId !== null && (
                    <small className="text-muted">
                      Leave empty if you don't want to change the image.
                    </small>
                  )}
                </div>

                {/* CATEGORY */}
                <div className="col-md-6">
                  <label className="form-label fw-semibold">
                    Category
                  </label>

                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">
                      Select Category
                    </option>

                    <option value="Roses">
                      Roses
                    </option>

                    <option value="Bouquets">
                      Bouquets
                    </option>

                    <option value="Wedding">
                      Wedding
                    </option>

                    <option value="Gifts">
                      Gifts
                    </option>
                  </select>
                </div>

                {/* BUTTONS */}
                <div className="col-12 mt-4">

                  <button
                    type="submit"
                    className="btn btn-dark px-4 me-2"
                  >
                    {editId !== null
                      ? "Update Product"
                      : "Add Product"}
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

      {/* =========================
          PRODUCT TABLE
      ========================= */}
      <div className="card border-0 shadow-sm">
        <div className="card-body">

          <div className="d-flex justify-content-between align-items-center mb-3">

            <h5 className="fw-bold mb-0">
              Products
            </h5>

            <button
              className="btn btn-dark btn-sm"
              onClick={openAddForm}
            >
              + Add Product
            </button>

          </div>

          <div className="table-responsive">

            <table className="table align-middle">

              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {products.length > 0 ? (

                  products.map((item) => (

                    <tr key={item.id}>

                      <td>
                        {item.id}
                      </td>

                      <td className="fw-bold">
                        {item.name}
                      </td>

                      <td>
                        <span className="badge bg-light text-dark border">
                          {item.category}
                        </span>
                      </td>

                      <td>
                        ₹{item.price}
                      </td>

                      <td>

                        <button
                          className="btn btn-sm btn-outline-dark me-2"
                          onClick={() => EditProduct(item)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() =>
                            DeleteProduct(item.id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>
                    <td
                      colSpan="5"
                      className="text-center py-4"
                    >
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