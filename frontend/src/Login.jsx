import React, { useState } from "react";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token",data.token);

      localStorage.setItem("user",JSON.stringify(data.user));

      alert("Login successful");

      window.location.href="/";

    } 
    catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 shadow">
            <div className="card-body p-4">
              <h3 className="text-center fw-bold mb-2">Welcome Back</h3>

              <p className="text-center text-muted mb-4">
                Login to your FloraMart account
              </p>

              <form onSubmit={handleSubmit}>
                {/* EMAIL */}

                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>

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
                  <label className="form-label fw-semibold">Password</label>

                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Enter your password"
                    required
                  />
                </div>

                {/* LOGIN */}

                <button type="submit" className="btn btn-dark w-100">
                  Login
                </button>
              </form>

              <div className="text-center mt-3">
                <span>Don't have an account? </span>

                <a href="/signup">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
