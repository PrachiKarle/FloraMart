import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Profile({ user }) {

  const [cartItems, setCartItems] = useState([]);

  // GET CART
  useEffect(() => {
    if (user?.id) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/cart/${user.id}`
      );

      const data = await response.json();

      console.log("Cart Response:", data);

      if (!response.ok) {
        alert(data.error || "Unable to fetch cart");
        return;
      }

      // Your API directly returns the array
      setCartItems(data);

    } catch (error) {
      console.log("GET CART ERROR:", error);
    }
  };


  // UPDATE CART QUANTITY
  const updateQuantity = async (cartId, quantity) => {

    if (quantity < 1) {
      return;
    }

    try {

      const response = await fetch(
        `http://localhost:8000/api/cart/${cartId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            quantity: quantity
          })
        }
      );

      const data = await response.json();

      console.log("Update Cart:", data);

      if (!response.ok) {
        alert(data.error || "Unable to update cart");
        return;
      }

      // Update cart UI
      setCartItems((items) =>
        items.map((item) =>
          item.id === cartId
            ? {
                ...item,
                quantity: quantity
              }
            : item
        )
      );

    } catch (error) {

      console.log("UPDATE CART ERROR:", error);

    }
  };


  // DELETE CART ITEM
  const deleteCartItem = async (cartId) => {

    try {

      const response = await fetch(
        `http://localhost:8000/api/cart/${cartId}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      console.log("Delete Cart:", data);

      if (!response.ok) {
        alert(data.error || "Unable to remove item");
        return;
      }

      // Remove item from UI
      setCartItems((items) =>
        items.filter((item) => item.id !== cartId)
      );

    } catch (error) {

      console.log("DELETE CART ERROR:", error);

    }
  };


  // LOGIN CHECK
  if (!user) {

    return (
      <div className="container py-5 text-center">

        <h3>Please login first</h3>

        <Link
          to="/login"
          className="btn btn-dark mt-3"
        >
          Login
        </Link>

      </div>
    );

  }


  return (
    <div className="container py-5">

      {/* PAGE HEADING */}
      <div className="text-center mb-5">

        <h1 className="fw-bold">
          My Profile
        </h1>

        <p className="text-secondary">
          Manage your account information
        </p>

      </div>


      <div className="row justify-content-center">

        <div className="col-lg-10">

          <div className="card border-0 shadow-sm">

            <div className="card-body p-5">


              {/* PROFILE */}
              <div className="text-center mb-4">

                <div
                  className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{
                    width: "110px",
                    height: "110px",
                    fontSize: "45px"
                  }}
                >

                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : "U"}

                </div>


                <h3 className="fw-bold mb-1">
                  {user.name}
                </h3>


                <p className="text-secondary mb-0">
                  {user.email}
                </p>

              </div>


              <hr />


              {/* PERSONAL INFORMATION */}
              <div className="mt-4">

                <h5 className="fw-bold mb-4">
                  Personal Information
                </h5>


                <div className="row g-4">


                  {/* NAME */}
                  <div className="col-md-6">

                    <div className="border rounded p-3">

                      <small className="text-secondary">
                        Full Name
                      </small>

                      <div className="fw-semibold mt-1">
                        {user.name}
                      </div>

                    </div>

                  </div>


                  {/* EMAIL */}
                  <div className="col-md-6">

                    <div className="border rounded p-3">

                      <small className="text-secondary">
                        Email
                      </small>

                      <div className="fw-semibold mt-1">
                        {user.email}
                      </div>

                    </div>

                  </div>


                  {/* PHONE */}
                  {user.phone && (

                    <div className="col-md-6">

                      <div className="border rounded p-3">

                        <small className="text-secondary">
                          Phone
                        </small>

                        <div className="fw-semibold mt-1">
                          {user.phone}
                        </div>

                      </div>

                    </div>

                  )}


                  {/* USER ID */}
                  {user.id && (

                    <div className="col-md-6">

                      <div className="border rounded p-3">

                        <small className="text-secondary">
                          User ID
                        </small>

                        <div className="fw-semibold mt-1">
                          {user.id}
                        </div>

                      </div>

                    </div>

                  )}

                </div>

              </div>


              <hr className="my-4" />


              {/* CART */}
              <div>

                <h5 className="fw-bold mb-3">
                  My Cart
                </h5>


                {/* EMPTY CART */}
                {cartItems.length === 0 ? (

                  <div className="border rounded p-4 text-center">

                    <div className="fs-1 mb-2">
                      🛒
                    </div>

                    <h6 className="fw-bold">
                      Your cart is empty
                    </h6>

                    <p className="text-secondary mb-3">
                      Add some beautiful flowers to your cart.
                    </p>

                    <Link
                      to="/shop"
                      className="btn btn-dark"
                    >
                      Shop Now
                    </Link>

                  </div>

                ) : (

                  <div>


                    {/* CART ITEMS */}
                    {cartItems.map((item) => (

                      <div
                        key={item.id}
                        className="border rounded p-3 mb-3"
                      >

                        <div className="row align-items-center">


                          {/* FLOWER IMAGE */}
                          <div className="col-md-2">

                            <img
                              src={item.image}
                              alt={item.name}
                              className="rounded img-fluid"
                              style={{
                                width: "80px",
                                height: "80px",
                                objectFit: "cover"
                              }}
                            />

                          </div>


                          {/* FLOWER DETAILS */}
                          <div className="col-md-4">

                            <h6 className="fw-bold mb-1">
                              {item.name}
                            </h6>

                            <small className="text-secondary">
                              {item.category}
                            </small>

                            <div className="mt-1">
                              ₹{item.price}
                            </div>

                          </div>


                          {/* QUANTITY */}
                          <div className="col-md-3">

                            <small className="text-secondary d-block mb-1">
                              Quantity
                            </small>


                            <div className="d-flex align-items-center">


                              {/* MINUS */}
                              <button
                                className="btn btn-outline-dark btn-sm"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Number(item.quantity) - 1
                                  )
                                }
                                disabled={
                                  Number(item.quantity) <= 1
                                }
                              >
                                −
                              </button>


                              {/* QUANTITY */}
                              <span className="px-3 fw-bold">
                                {item.quantity}
                              </span>


                              {/* PLUS */}
                              <button
                                className="btn btn-outline-dark btn-sm"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    Number(item.quantity) + 1
                                  )
                                }
                              >
                                +
                              </button>

                            </div>

                          </div>


                          {/* TOTAL + DELETE */}
                          <div className="col-md-3 text-end">

                            <div className="fw-bold mb-2">

                              ₹
                              {Number(item.price) *
                                Number(item.quantity)}

                            </div>


                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() =>
                                deleteCartItem(item.id)
                              }
                            >
                              Delete
                            </button>

                          </div>

                        </div>

                      </div>

                    ))}


                    {/* CART TOTAL */}
                    <div className="border-top pt-3 d-flex justify-content-between align-items-center">

                      <h6 className="fw-bold mb-0">
                        Cart Total
                      </h6>


                      <h5 className="fw-bold mb-0">

                        ₹
                        {cartItems.reduce(
                          (total, item) =>
                            total +
                            Number(item.price) *
                            Number(item.quantity),
                          0
                        )}

                      </h5>

                    </div>

                  </div>

                )}

              </div>


              {/* BUTTONS */}
              <div className="d-flex gap-3 justify-content-center mt-5">

                <Link
                  to="/shop"
                  className="btn btn-dark px-4"
                >
                  Continue Shopping
                </Link>


                <Link
                  to="/"
                  className="btn btn-outline-dark px-4"
                >
                  Home
                </Link>

              </div>


            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;