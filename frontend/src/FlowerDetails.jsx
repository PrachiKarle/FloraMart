import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function FlowerDetails({ props }) {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [flower, setFlower] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/flower/${id}`);

      const data = await response.json();

      console.log("API Response:", data);

      if (!response.ok) {
        alert(data.error || "Unable to fetch flower");
        return;
      }

      if (Array.isArray(data)) {
        setFlower(data[0]);
      } else if (Array.isArray(data.data)) {
        setFlower(data.data[0]);
      } else if (data.data) {
        setFlower(data.data);
      } else {
        setFlower(data);
      }
    } catch (err) {
      console.log(err);
      alert("Unable to fetch flower details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props && props.user) {
      setUser(props.user);
    }

    fetchData();
  }, [id]);

  const AddToCart = async () => {
    try {
      if (!flower) {
        alert("Flower details not available");
        return;
      }

      if (!user || !user.id) {
        alert("Please login first");
        return;
      }

      const response = await fetch("http://localhost:8000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          flower_id: flower.id,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Unable to add item to cart");
        return;
      }

      alert(data.message);
    } catch (err) {
      console.log("Add Cart Error:", err);
      alert("Unable to add item to cart");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h3>Loading...</h3>
      </div>
    );
  }

  if (!flower) {
    return (
      <div className="container py-5 text-center">
        <h2>Flower Not Found</h2>

        <Link to="/shop" className="btn btn-dark mt-3">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row align-items-center g-5">
        <div className="col-lg-6">
          <img
            src={flower.image}
            alt={flower.name}
            className="img-fluid w-100"
          />
        </div>

        <div className="col-lg-6">
          <p className="text-uppercase text-secondary">{flower.category}</p>

          <h1 className="display-4 fw-bold">{flower.name}</h1>

          <h3 className="mt-4">₹{flower.price}</h3>

          <p className="text-secondary mt-4">
            Beautifully arranged fresh flowers designed to make every special
            moment memorable. Perfect for gifting, celebrations and expressing
            your feelings.
          </p>

          <div className="mt-4">
            <p>
              <strong>Category:</strong> {flower.category}
            </p>

            <p>
              <strong>Freshness:</strong> Freshly arranged
            </p>

            <p>
              <strong>Delivery:</strong> Same day delivery available
            </p>
          </div>

          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-dark px-4 py-2" onClick={AddToCart}>
              Add to Cart
            </button>

            <Link to="/shop" className="btn btn-outline-dark px-4 py-2">
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlowerDetails;
