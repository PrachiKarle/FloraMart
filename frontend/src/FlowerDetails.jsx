import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function FlowerDetails({ user }) {
  const { id } = useParams();

  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);

  const totalAmount = flower ? Number(flower.price) : 0;

  // ==========================================
  // FETCH FLOWER
  // ==========================================

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:8000/api/flower/${id}`
        );

        const data = await response.json();

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
        console.error("Flower Fetch Error:", error);

        alert("Unable to fetch flower details");

      } finally {
        setLoading(false);
      }
    };

    fetchData();

  }, [id]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const AddToCart = async () => {
    try {
      if (!user) {
        alert("Please login first");
        return;
      }

      if (!user.id) {
        alert("User ID not found. Please login again.");
        return;
      }

      if (!flower) {
        alert("Flower details not available");
        return;
      }

      if (!flower.id) {
        alert("Flower ID not found");
        return;
      }

      const cartData = {
        user_id: user.id,
        flower_id: flower.id,
        quantity: 1,
      };

      const response = await fetch(
        "http://localhost:8000/api/cart",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(cartData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.error ||
          "Unable to add item to cart"
        );

        return;
      }

      alert(
        data.message ||
        "Item added to cart successfully"
      );

    } catch (error) {
      console.error("Add Cart Error:", error);

      alert("Unable to add item to cart");
    }
  };

  // ==========================================
  // BUY NOW
  // ==========================================

  const handlePayment = async () => {
    try {
      // Check user
      if (!user) {
        alert("Please login first");
        return;
      }

      // Check user ID
      if (!user.id) {
        alert(
          "User ID not found. Please login again."
        );

        return;
      }

      // Check flower
      if (!flower) {
        alert(
          "Flower details not available"
        );

        return;
      }

      // Get JWT
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      console.log(
        "Token exists:",
        !!token
      );

      // ======================================
      // CREATE RAZORPAY ORDER
      // ======================================

      const response = await fetch(
        "http://localhost:8000/api/payment/create-order",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            amount: totalAmount,
            flower_id: flower.id,
            quantity: 1,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "Create Order Response:",
        data
      );

      if (!response.ok || !data.success) {
        alert(
          data.message ||
          data.error ||
          "Unable to create payment order"
        );

        return;
      }

      // ======================================
      // CHECK RAZORPAY SDK
      // ======================================

      if (!window.Razorpay) {
        alert(
          "Razorpay SDK not loaded"
        );

        return;
      }

      // ======================================
      // RAZORPAY OPTIONS
      // ======================================

      const options = {
        key:
          process.env.REACT_APP_RAZORPAY_KEY_ID,

        amount:
          data.order.amount,

        currency: "INR",

        name: "Fiama Flowers",

        description:
          `Purchase - ${flower.name}`,

        order_id:
          data.order.id,

        handler:
          async function (
            paymentResponse
          ) {
            console.log(
              "Payment Response:",
              paymentResponse
            );

            await verifyPayment(
              paymentResponse
            );
          },

        prefill: {
          name:
            user.name || "",

          email:
            user.email || "",
        },

        theme: {
          color: "#3399cc",
        },
      };

      // ======================================
      // OPEN RAZORPAY
      // ======================================

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment Failed:",
            response.error
          );

          alert(
            response.error.description ||
            "Payment failed"
          );
        }
      );

      razorpay.open();

    } catch (error) {
      console.error(
        "Payment Error:",
        error
      );

      alert(
        "Unable to process payment"
      );
    }
  };

  // ==========================================
  // VERIFY PAYMENT
  // ==========================================

  const verifyPayment = async (
    paymentResponse
  ) => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      const result = await fetch(
        "http://localhost:8000/api/payment/verify",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            Authorization:
              `Bearer ${token}`,
          },

          body: JSON.stringify({
            razorpay_order_id:
              paymentResponse
                .razorpay_order_id,

            razorpay_payment_id:
              paymentResponse
                .razorpay_payment_id,

            razorpay_signature:
              paymentResponse
                .razorpay_signature,
          }),
        }
      );

      const data =
        await result.json();

      console.log(
        "Verification Response:",
        data
      );

      if (!result.ok) {
        alert(
          data.message ||
          data.error ||
          "Payment verification failed"
        );

        return;
      }

      if (data.success) {
        alert(
          "Payment successful!"
        );
      } else {
        alert(
          "Payment verification failed"
        );
      }

    } catch (error) {
      console.error(
        "Payment Verification Error:",
        error
      );

      alert(
        "Payment verification error"
      );
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  // ==========================================
  // FLOWER NOT FOUND
  // ==========================================

  if (!flower) {
    return (
      <div className="container py-5 text-center">

        <h2>
          Flower Not Found
        </h2>

        <Link
          to="/shop"
          className="btn btn-dark mt-3"
        >
          Back to Shop
        </Link>

      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="container py-5">

      <div className="row align-items-center g-5">

        {/* IMAGE */}

        <div className="col-lg-6">

          <img
            src={`http://localhost:8000/uploads/${flower.image}`}
            alt={flower.name}
            className="img-fluid w-100"
          />

        </div>

        {/* DETAILS */}

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
            Beautifully arranged fresh flowers
            designed to make every special
            moment memorable. Perfect for
            gifting, celebrations and expressing
            your feelings.
          </p>

          <div className="mt-4">

            <p>
              <strong>
                Category:
              </strong>{" "}
              {flower.category}
            </p>

            <p>
              <strong>
                Freshness:
              </strong>{" "}
              Freshly arranged
            </p>

            <p>
              <strong>
                Delivery:
              </strong>{" "}
              Same day delivery available
            </p>

          </div>

          {/* BUTTONS */}

          <div className="d-flex gap-3 mt-4">

            <button
              className="btn btn-dark px-4 py-2"
              onClick={AddToCart}
            >
              Add to Cart
            </button>

            <button
              className="btn btn-outline-dark px-4 py-2"
              onClick={handlePayment}
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FlowerDetails;