import React, { useState } from "react";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check password
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/user/signup",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: user.name,
            email: user.email,
            password: user.password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Signup failed");
        return;
      }

      alert("Account created successfully");

      window.location.href = "/login";

    } catch (err) {
      console.error("Signup error:", err);
      alert("Unable to connect to server");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">

          <div className="card border-0 shadow">
            <div className="card-body p-4">

              <h3 className="text-center fw-bold mb-2">
                Create Account
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
                    value={user.name}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your name"
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
                    value={user.email}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your email"
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
                    value={user.password}
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
                    value={user.confirmPassword}
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
                <a href="/login">Login</a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;