import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Shop() {
  const [category, setCategory] = useState("All");
  const [flowers, setFlowers] = useState([]);

  const fetchFlowers = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/flower"
      );

      const result = await response.json();

      console.log("API Response:", result);

      if (!response.ok) {
        alert(result.error || "Unable to fetch flowers");
        return;
      }

      if (Array.isArray(result)) {
        setFlowers(result);
      } else if (Array.isArray(result.data)) {
        setFlowers(result.data);
      } else if (Array.isArray(result.flowers)) {
        setFlowers(result.flowers);
      } else {
        console.log("Unexpected API response:", result);
        setFlowers([]);
      }
    } catch (err) {
      console.log("Fetch Error:", err);
      alert("Unable to connect to server");
    }
  };

  useEffect(() => {
    fetchFlowers();
  }, []);

  const filteredFlowers = Array.isArray(flowers)
    ? category === "All"
      ? flowers
      : flowers.filter(
          (flower) => flower.category === category
        )
    : [];

  return (
    <div className="bg-light">

      {/* Header */}
      <section className="container-fluid bg-light py-5">
        <div className="container py-5">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">

              <small className="text-secondary fw-semibold">
                OUR COLLECTION
              </small>

              <h1 className="display-3 mt-3">
                <em>Flowers for every occasion</em>
              </h1>

              <p className="text-secondary mt-4">
                Discover beautiful, hand-crafted flower arrangements
                created to make every moment special.
              </p>

            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container py-5">

        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">

          <button
            className={
              category === "All"
                ? "btn btn-dark px-4"
                : "btn btn-outline-dark px-4"
            }
            onClick={() => setCategory("All")}
          >
            All Flowers
          </button>

          <button
            className={
              category === "Roses"
                ? "btn btn-dark px-4"
                : "btn btn-outline-dark px-4"
            }
            onClick={() => setCategory("Roses")}
          >
            Roses
          </button>

          <button
            className={
              category === "Bouquets"
                ? "btn btn-dark px-4"
                : "btn btn-outline-dark px-4"
            }
            onClick={() => setCategory("Bouquets")}
          >
            Bouquets
          </button>

          <button
            className={
              category === "Wedding"
                ? "btn btn-dark px-4"
                : "btn btn-outline-dark px-4"
            }
            onClick={() => setCategory("Wedding")}
          >
            Wedding
          </button>

          <button
            className={
              category === "Gifts"
                ? "btn btn-dark px-4"
                : "btn btn-outline-dark px-4"
            }
            onClick={() => setCategory("Gifts")}
          >
            Gifts
          </button>

        </div>

        {/* Flowers */}
        <div className="row g-4">

          {filteredFlowers.map((flower) => (
            <div
              className="col-xl-4 col-lg-4 col-md-6 col-12"
              key={flower.id}
            >

              <div className="card border-0 bg-white h-100 shadow-sm">

                <div className="ratio ratio-1x1">
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="card-img-top object-fit-cover"
                  />
                </div>

                <div className="card-body text-center p-4">

                  <h5 className="card-title fw-normal">
                    <em>{flower.name}</em>
                  </h5>

                  <h6 className="mb-3">
                    ₹{flower.price}
                  </h6>

                  <p className="text-secondary mb-3">
                    {flower.category}
                  </p>

                  <Link
                    to={`/shop/${flower.id}`}
                    className="btn btn-outline-dark px-4"
                  >
                    View Details
                  </Link>

                </div>

              </div>

            </div>
          ))}

          {filteredFlowers.length === 0 && (
            <div className="col-12 text-center py-5">

              <h4>No flowers found</h4>

              <p className="text-secondary">
                Please select another category.
              </p>

            </div>
          )}

        </div>

      </section>

      {/* Bottom Section */}
      <section className="container-fluid bg-light py-5">

        <div className="container py-5">

          <div className="row align-items-center">

            <div className="col-lg-7 text-center text-lg-start">

              <small className="text-secondary fw-semibold">
                MADE WITH LOVE
              </small>

              <h2 className="display-5 mt-3">
                <em>Make someone's day special.</em>
              </h2>

              <p className="text-secondary mt-3">
                Beautiful flowers, thoughtfully arranged and
                delivered with care.
              </p>

              <button
                className="btn btn-dark px-4 py-2 mt-3"
                onClick={() => setCategory("All")}
              >
                SHOP NOW
              </button>

            </div>

            <div className="col-lg-5 text-center mt-4 mt-lg-0">

              <div className="display-1">
                🌷
              </div>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Shop;