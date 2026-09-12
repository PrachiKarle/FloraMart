import React, { useState } from "react";
function AdminLogin() {
  const [user, setUser] = useState({ email: "", password: "" });
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log("Login Response:", data);
      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }
      localStorage.setItem("admintoken", data.token);
      localStorage.setItem("admin", JSON.stringify(data.user));
      alert(data.message);
      window.location.href = "/admin";
    } catch (err) {
      console.error("Login Error:", err);
      alert("Unable to connect to server");
    }
  };
  return (
    <div className="container py-5">
      {" "}
      <div className="row justify-content-center">
        {" "}
        <div className="col-md-5">
          {" "}
          <div className="card border-0 shadow">
            {" "}
            <div className="card-body p-4">
              {" "}
              <h3 className="text-center fw-bold mb-2"> Welcome Back </h3>{" "}
              <p className="text-center text-muted mb-4">
                {" "}
                Login to your FloraMart account{" "}
              </p>{" "}
              <form onSubmit={handleSubmit}>
                {" "}
                {/* EMAIL */}{" "}
                <div className="mb-3">
                  {" "}
                  <label className="form-label fw-semibold"> Email </label>{" "}
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />{" "}
                </div>{" "}
                {/* PASSWORD */}{" "}
                <div className="mb-3">
                  {" "}
                  <label className="form-label fw-semibold">
                    {" "}
                    Password{" "}
                  </label>{" "}
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your password"
                    required
                  />{" "}
                </div>{" "}
                {/* LOGIN */}{" "}
                <button type="submit" className="btn btn-dark w-100">
                  {" "}
                  Login{" "}
                </button>{" "}
              </form>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export default AdminLogin;
