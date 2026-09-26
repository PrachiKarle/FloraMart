import React, { useState } from "react";

function Signup() {
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (customer.password !== customer.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/customer/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: customer.name,
            email: customer.email,
            password: customer.password,
            phone: customer.phone,
            address: customer.address,
            city: customer.city,
            state: customer.state,
            pincode: customer.pincode,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Customer account created successfully");

      window.location.href = "/login";
    } catch (err) {
      console.error("Signup error:", err);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">

          <div className="card border-0 shadow">
            <div className="card-body p-4">

              <h3 className="text-center fw-bold mb-2">
                Create Customer Account
              </h3>

              <p className="text-center text-muted mb-4">
                Join FloraMart today
              </p>

              <form onSubmit={handleSubmit}>

                {/* NAME */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={customer.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* PHONE */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={customer.phone}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>

                {/* ADDRESS */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={customer.address}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your delivery address"
                    rows="3"
                    required
                  />
                </div>

                {/* CITY */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={customer.city}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your city"
                    required
                  />
                </div>

                {/* STATE */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    value={customer.state}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your state"
                    required
                  />
                </div>

                {/* PINCODE */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="pincode"
                    value={customer.pincode}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your pincode"
                    maxLength="6"
                    required
                  />
                </div>

                {/* PASSWORD */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={customer.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Create password"
                    required
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={customer.confirmPassword}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Confirm password"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-dark w-100"
                >
                  Create Account
                </button>

              </form>

              <div className="text-center mt-3">
                <span>Already have an account? </span>

                <a href="/login">
                  Login
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;