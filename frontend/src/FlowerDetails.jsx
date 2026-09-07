import React from "react";
import { Link, useParams } from "react-router-dom";

function FlowerDetails() {
  const { id } = useParams();

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

  const flower = flowers.find(
    (item) => item.id === Number(id)
  );

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
            {flower.price}
          </h3>

          <p className="text-secondary mt-4">
            Beautifully arranged fresh flowers designed to
            make every special moment memorable. Perfect
            for gifting, celebrations and expressing your
            feelings.
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

          <div className="d-flex gap-3 mt-4">

            <button className="btn btn-dark px-4 py-2">
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