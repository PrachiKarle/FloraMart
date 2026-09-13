import React, { useState, useEffect } from "react";
import AdminProduct from "./AdminProduct";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  // ================= FETCH CART =================
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("admintoken");

      if (!token) {
        alert("Please Login First");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/cart",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("CART RESPONSE:", data);

      if (response.ok) {
        // API returns array directly
        setOrders(data);
      } else {
        console.log(data.error || "Failed to fetch cart");
      }
    } catch (err) {
      console.log("FETCH CART ERROR:", err);
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= DELETE CART ITEM =================
  const deleteCartItem = async (cartId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/${cartId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      console.log("DELETE CART:", data);

      if (!response.ok) {
        alert(data.error || "Unable to remove item");
        return;
      }

      // Remove item from frontend
      setOrders((items) =>
        items.filter((item) => item.id !== cartId)
      );

    } catch (error) {
      console.log("DELETE CART ERROR:", error);
      alert("Unable to remove item");
    }
  };

  // ================= TOTAL =================
  const cartTotal = orders.reduce(
    (total, item) =>
      total +
      Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">

        {/* ================= SIDEBAR ================= */}

        <div className="col-lg-2 bg-dark text-white min-vh-100 p-0">

          <div className="p-4 border-bottom border-secondary">
            <h3 className="mb-0">
              <em>fiama</em>
            </h3>

            <small className="text-secondary">
              Admin Panel
            </small>
          </div>

          <div className="p-3">

            <button className="btn btn-light w-100 text-start mb-2">
              Dashboard
            </button>

            <button className="btn btn-dark text-white w-100 text-start mb-2">
              Products
            </button>

            <button className="btn btn-dark text-white w-100 text-start mb-2">
              Orders
            </button>

            <button className="btn btn-dark text-white w-100 text-start mb-2">
              Customers
            </button>

            <button className="btn btn-dark text-white w-100 text-start mb-2">
              Reports
            </button>

          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}

        <div className="col-lg-10 p-4">

          {/* HEADER */}

          <div className="mb-4">
            <h2 className="fw-bold mb-1">
              Dashboard
            </h2>

            <p className="text-secondary mb-0">
              Welcome back, Admin 👋
            </p>
          </div>


          {/* ================= CART ================= */}

          <div className="card border-0 shadow-sm mb-4">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <h5 className="fw-bold mb-0">
                  Cart Items
                </h5>

                <span className="text-secondary">
                  {orders.length} Item(s)
                </span>

              </div>


              <div className="table-responsive">

                <table className="table align-middle">

                  <thead className="table-light">

                    <tr>
                      <th>Product</th>
                      <th>User ID</th>
                      <th>Category</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Action</th>
                    </tr>

                  </thead>


                  <tbody>

                    {orders.length === 0 ? (

                      <tr>
                        <td
                          colSpan="7"
                          className="text-center py-4"
                        >
                          No items in cart
                        </td>
                      </tr>

                    ) : (

                      orders.map((item) => (

                        <tr key={item.id}>

                          {/* PRODUCT */}

                          <td>

                            <div className="d-flex align-items-center">

                              <img
                                src={item.image}
                                alt={item.name}
                                className="rounded me-3"
                                style={{
                                  width: "55px",
                                  height: "55px",
                                  objectFit: "cover",
                                }}
                              />

                              <span className="fw-semibold">
                                {item.name}
                              </span>

                            </div>

                          </td>


                          {/* USER ID */}

                          <td>
                            {item.user_id}
                          </td>


                          {/* CATEGORY */}

                          <td>
                            {item.category}
                          </td>


                          {/* PRICE */}

                          <td>
                            ₹{Number(item.price)}
                          </td>


                          {/* QUANTITY */}

                          <td>
                            {item.quantity}
                          </td>


                          {/* TOTAL */}

                          <td className="fw-bold">
                            ₹
                            {Number(item.price) *
                              Number(item.quantity)}
                          </td>


                          {/* DELETE */}

                          <td>

                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() =>
                                deleteCartItem(item.id)
                              }
                            >
                              Delete
                            </button>

                          </td>

                        </tr>

                      ))

                    )}

                  </tbody>

                </table>

              </div>


              {/* ================= CART TOTAL ================= */}

              {orders.length > 0 && (

                <div className="border-top pt-3 mt-3 d-flex justify-content-between align-items-center">

                  <span className="fw-bold">
                    Cart Total
                  </span>

                  <span className="fs-5 fw-bold">
                    ₹{cartTotal}
                  </span>

                </div>

              )}

            </div>

          </div>


          {/* ================= PRODUCTS ================= */}

          <AdminProduct />

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;