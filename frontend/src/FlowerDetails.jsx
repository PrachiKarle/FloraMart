import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function FlowerDetails({ user }) {
  const { id } = useParams();

  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch flower details
  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `http://localhost:8000/api/flower/${id}`
      );

      const data = await response.json();

      // console.log("Flower API Response:", data);

      if (!response.ok) {
        alert(data.error || "Unable to fetch flower");
        return;
      }

      if (data.data) {
        setFlower(data.data);
      } else {
        setFlower(data);
      }

    } catch (error) {
      console.log("Flower Fetch Error:", error);
      alert("Unable to fetch flower details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // console.log("User received in FlowerDetails:", user);

    fetchData();
  }, [id]);

  // Add to cart
  const AddToCart = async () => {
    try {
      // console.log("User:", user);
      // console.log("Flower:", flower);

      // User not logged in
      if (!user) {
        alert("Please login first");
        return;
      }

      // User ID check
      if (!user.id) {
        alert("User ID not found. Please login again.");
        return;
      }

      // Flower check
      if (!flower) {
        alert("Flower details not available");
        return;
      }

      // Flower ID check
      if (!flower.id) {
        alert("Flower ID not found");
        return;
      }

      const cartData = {
        user_id: user.id,
        flower_id: flower.id,
        quantity: 1
      };

      // console.log("Sending to cart:", cartData);

      const response = await fetch(
        "http://localhost:8000/api/cart",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(cartData)
        }
      );

      const data = await response.json();

      // console.log("Cart API Response:", data);

      if (!response.ok) {
        alert(
          data.error || "Unable to add item to cart"
        );
        return;
      }

      alert(
        data.message ||
        "Item added to cart successfully"
      );

    } catch (error) {
      console.log("Add Cart Error:", error);
      alert("Unable to add item to cart");
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  // Flower not found
  if (!flower) {
    return (
      <div className="container py-5 text-center">

        <h2>Flower Not Found</h2>

        <Link
          to="/shop"
          className="btn btn-dark mt-3"
        >
          Back to Shop
        </Link>

      </div>
    );
  }

  return (
    <div className="container py-5">

      <div className="row align-items-center g-5">

        {/* Image */}
        <div className="col-lg-6">

          <img
            src={flower.image}
            alt={flower.name}
            className="img-fluid w-100"
          />

        </div>

        {/* Details */}
        <div className="col-lg-6">

          <p className="text-uppercase text-secondary">
            {flower.category}
          </p>

          <h1 className="display-4 fw-bold">
            {flower.name}
          </h1>

          <h3 className="mt-4">
            ₹{flower.price}
          </h3>

          <p className="text-secondary mt-4">
            Beautifully arranged fresh flowers designed
            to make every special moment memorable.
            Perfect for gifting, celebrations and
            expressing your feelings.
          </p>

          <div className="mt-4">

            <p>
              <strong>Category:</strong>{" "}
              {flower.category}
            </p>

            <p>
              <strong>Freshness:</strong>{" "}
              Freshly arranged
            </p>

            <p>
              <strong>Delivery:</strong>{" "}
              Same day delivery available
            </p>

          </div>

          {/* Buttons */}
          <div className="d-flex gap-3 mt-4">

            <button
              className="btn btn-dark px-4 py-2"
              onClick={AddToCart}
            >
              Add to Cart
            </button>

            <Link
              to="/shop"
              className="btn btn-outline-dark px-4 py-2"
            >
              Back to Shop
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FlowerDetails;