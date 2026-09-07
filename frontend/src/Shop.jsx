import React, { useState } from "react";
import { Link } from "react-router-dom";

function Shop() {
  // Selected category
  const [category, setCategory] = useState("All");

  // Products
  const flowers = [
    // ================= ROSES =================
    {
      id: 4,
      name: "Pure Romance",
      price: "₹1,599",
      // image: "./s8.png",
      image: "./s1.png",
      category: "Roses",
    },
    {
      id: 6,
      name: "Classic Roses",
      price: "₹1,699",
      // image: "./s10.png"
      image: "./s2.png",
      category: "Roses",
    },
    {
      id: 19,
      name: "Red Romance",
      price: "₹1,599",
      // image: "./s23.png"
      image: "./s3.png",
      category: "Roses",
    },
    {
      id: 20,
      name: "Velvet Roses",
      price: "₹1,899",
      // image: "./s24.png"
      image: "./s4.png",
      category: "Roses",
    },
    {
      id: 21,
      name: "Rose Garden",
      price: "₹1,799",
      // image: "./s25.png"
      image: "./s5.png",
      category: "Roses",
    },
    {
      id: 22,
      name: "Ruby Romance",
      price: "₹2,099",
      // image: "./s26.png"
      image: "./s6.png",
      category: "Roses",
    },

    // ================= BOUQUETS =================
    {
      id: 1,
      name: "White Elegance",
      price: "₹1,499",
      image: "./s7.png",
      category: "Bouquets",
    },
    {
      id: 7,
      name: "Blush Bouquet",
      price: "₹1,399",
      image: "./s8.png",
      category: "Bouquets",
    },
    {
      id: 8,
      name: "Spring Garden",
      price: "₹1,599",
      image: "./s9.png",
      category: "Bouquets",
    },
    {
      id: 9,
      name: "Floral Charm",
      price: "₹1,899",
      image: "./s10.png",
      // image:"./s.png",,
      category: "Bouquets",
    },
    {
      id: 10,
      name: "Pink Paradise",
      price: "₹1,749",
      image: "./s11.png",
      // image:"./s.png",,
      category: "Bouquets",
    },

    // ================= WEDDING =================
    {
      id: 2,
      name: "Spring Bloom",
      price: "₹1,299",
      // image: "./s6.png",
      image: "./s12.png",
      category: "Wedding",
    },
    {
      id: 5,
      name: "Pastel Dreams",
      price: "₹1,899",
      // image: "./s9.png",
      image: "./s13.png",
      category: "Wedding",
    },
    {
      id: 11,
      name: "Bridal Bliss",
      price: "₹2,499",
      // image: "./s15.png"
      image: "./s14.png",
      category: "Wedding",
    },
    {
      id: 12,
      name: "White Wedding",
      price: "₹2,299",
      image: "./s15.png",
      // image:"./s.png",,
      category: "Wedding",
    },
    {
      id: 13,
      name: "Forever Bloom",
      price: "₹2,599",
      image: "./s16.png",
      // image:"./s.png",,
      category: "Wedding",
    },
    {
      id: 14,
      name: "Royal Wedding",
      price: "₹2,799",
      image: "./s17.png",
      // image:"./s.png",,
      category: "Wedding",
    },

    // ================= GIFTS =================
    {
      id: 3,
      name: "Golden Love",
      price: "₹1,799",
      // image: "./s7.png",
      image: "./s18.png",
      category: "Gifts",
    },
    {
      id: 15,
      name: "Love Surprise",
      price: "₹1,999",
      image: "./s19.png",
      // image:"./s.png",,
      category: "Gifts",
    },
    {
      id: 16,
      name: "Sweet Blossom",
      price: "₹1,499",
      image: "./s20.png",
      // image:"./s.png",,
      category: "Gifts",
    },
    {
      id: 17,
      name: "Gift of Love",
      price: "₹1,899",
      image: "./s21.png",
      // image:"./s.png",,
      category: "Gifts",
    },
    {
      id: 18,
      name: "Blooming Wishes",
      price: "₹1,699",
      image: "./s22.png",
      // image:"./s.png",,
      category: "Gifts",
    },
  ];

  // Filter products
  const filteredFlowers =
    category === "All"
      ? flowers
      : flowers.filter((flower) => flower.category === category);

  return (
    <div className="bg-light">
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
                Discover beautiful, hand-crafted flower arrangements created to
                make every moment special.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-5">
        <div className="d-flex justify-content-center flex-wrap gap-2 mb-5">
          {/* All */}
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

          {/* Roses */}
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

          {/* Bouquets */}
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

          {/* Wedding */}
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

          {/* Gifts */}
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

        <div className="row g-4">
          {filteredFlowers.map((flower) => (
            <div className="col-xl-4 col-lg-4 col-md-6 col-12" key={flower.id}>
              <div className="card border-0 bg-white h-100 shadow-sm">
                {/* Image */}

                <div className="ratio ratio-1x1">
                  <img
                    src={flower.image}
                    alt={flower.name}
                    className="card-img-top object-fit-cover"
                  />
                </div>

                {/* Content */}

                <div className="card-body text-center p-4">
                  <h5 className="card-title fw-normal">
                    <em>{flower.name}</em>
                  </h5>

                  <p className="text-secondary mb-3">{flower.price}</p>

                  <small className="text-secondary d-block mb-3">
                    {flower.category}
                  </small>

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

          {/* No products */}

          {filteredFlowers.length === 0 && (
            <div className="col-12 text-center py-5">
              <h4>No flowers found</h4>

              <p className="text-secondary">Please select another category.</p>
            </div>
          )}
        </div>
      </section>

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
                Beautiful flowers, thoughtfully arranged and delivered with
                care.
              </p>

              <button
                className="btn btn-dark px-4 py-2 mt-3"
                onClick={() => setCategory("All")}
              >
                SHOP NOW
              </button>
            </div>

            <div className="col-lg-5 text-center mt-4 mt-lg-0">
              <div className="display-1">🌷</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Shop;
