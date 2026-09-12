import React, { useState, useEffect } from "react";
import AdminProduct from "./AdminProduct";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  const fetchData = async () => {
    try {
      const token=localStorage.getItem("admintoken");
      if(!token){
          alert("Please Login First");
      }
      var response = await fetch("http://localhost:8000/api/flower/order");
      var d1 = await response.json();
      console.log(d1.data);
      if (response.ok) {
        setOrders(d1.data);
      } else {
        console.log(d1.error || "Failed to fetch products");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">
        {/* ================= SIDEBAR ================= */}

        <div className="col-lg-2 bg-dark text-white min-vh-100 p-0">
          <div className="p-4 border-bottom border-secondary">
            <h3 className="mb-0">
              <em>fiama</em>
            </h3>

            <small className="text-secondary">Admin Panel</small>
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
          {/* Header */}

          <div className="mb-4">
            <h2 className="fw-bold mb-1">Dashboard</h2>

            <p className="text-secondary mb-0">Welcome back, Admin 👋</p>
          </div>

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">Recent Orders</h5>
              </div>

              <div className="table-responsive">
                <table className="table align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="text-center py-4">
                          No Order found
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id}>
                          <td className="fw-bold">{order.id}</td>

                          <td>{order.customer}</td>

                          <td>{order.product}</td>

                          <td>₹{order.amount}</td>

                          <td>
                            <span
                              className={
                                order.status === "Delivered"
                                  ? "badge bg-success"
                                  : order.status === "Pending"
                                    ? "badge bg-warning text-dark"
                                    : order.status === "Processing"
                                      ? "badge bg-primary"
                                      : "badge bg-danger"
                              }
                            >
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* products */}
          <AdminProduct />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
