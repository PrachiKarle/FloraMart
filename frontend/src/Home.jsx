import React from "react";

function Home() {

  return (
    <>
      <div className="container-fluid p-0 bg-light">
        <div className="row g-0 min-vh-100">
          <div className="col-lg-8 col-md-7 col-12">
            <img
              src="/hero.png"
              alt="Flowers"
              className="w-100 h-100 object-fit-cover"
            />
          </div>

          <div className="col-lg-4 col-md-5 col-12 d-flex align-items-center justify-content-center bg-white p-5">
            <div className="w-100">
              <div className="d-flex align-items-center justify-content-end gap-3 mb-4">
                <div className="border-top flex-grow-1"></div>

                <small
                  className="fw-semibold text-nowrap"
                  style={{ color: "#BF936B" }}
                >
                  EVERY OCCASION IS UNIQUE
                </small>
              </div>

              <h1 className="display-4 fw-normal text-dark text-end">
                <em>
                  Shouldn’t your Flowers
                  <br />
                  be unique too?
                </em>
              </h1>

              <div className="text-end mt-5">
                <button
                  type="button"
                  className="btn btn-outline-dark btn-sm px-4 py-2"
                >
                  OUR SERVICES
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-0 p-5 bg-light">
        <div className="col-lg-6 col-md-8 col-12 m-auto p-lg-5 p-0 text-center">
          <small
            className="fw-semibold text-nowrap"
            style={{ color: "#BF936B" }}
          >
            {" "}
            MAKING BOUQUETS WITH PASSION
          </small>
          <h1 className="display-4 fw-normal text-dark text-center">
            <em>We bring Spring freshness to your home!</em>{" "}
          </h1>
          <small>
            We often take for granted the beauty of this world: the flowers, the
            trees, the birds, the clouds even those we love. Because we see
            things so often, we see them less and less.
          </small>
        </div>
      </div>

      <div className="row m-0 p-5 bg-light">
        <div className="col-lg-6 col-md-9 col-12 m-0 p-0 m-auto">
          <div className="row m-0 p-0">
            <div className="col-md-4 col-12 d-flex flex-column align-items-center justify-content-center text-center m-0 p-2">
              WHEN WORDS ARE NOT ENOUGH
              <small className="fw-semibold my-3" style={{ color: "#BF936B" }}>
                Pre-made and custom bouquetes
              </small>
              <button
                type="button"
                className="btn btn-outline-dark btn-sm px-4 py-2"
              >
                ORDER NOW
              </button>
            </div>
            <div className="col-md-4 col-12 d-flex align-items-center justify-content-center m-0 p-0">
              <img
                src="./flower.jpeg"
                alt="Flower"
                className="img-fluid w-100 h-100 object-fit-cover"
              ></img>
            </div>
            <div className="col-md-4 col-12 d-flex align-items-center justify-content-center m-0 p-0">
              <img
                src="./flower1.jpeg"
                alt="Flower"
                className="img-fluid w-100 h-75 object-fit-cover"
              ></img>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-0 p-lg-5 p-3 bg-light">
        <h1 className="text-center text-dark fw-normal w-full p-2">
          <em>Our Seasonal Bestsellers!</em>
        </h1>

        <div className="row m-0 p-0 px-5 m-auto">
          <div className="col-lg-3 col-md-6 col-12 m-0 p-3">
            <img
              src="./s1.webp"
              alt="Flower 1"
              className="w-100 h-75 my-3 object-fit-cover"
            ></img>

            <h5 className="font-bold text-dark text-center">
              <em>Pink Flower Tree </em>
            </h5>
          </div>

          <div className="col-lg-3 col-md-6 col-12 m-0 p-3">
            <img
              src="./s2.webp"
              alt="Flower 2"
              className="w-100 h-75 my-3 object-fit-cover"
            ></img>
            <h5 className="font-bold text-dark text-center">
              <em>Premium Joyful </em>
            </h5>
          </div>

          <div className="col-lg-3 col-md-6 col-12 m-0 p-3">
            <img
              src="./s4.webp"
              alt="Flower 3"
              className="w-100 h-75 my-3 object-fit-cover"
            ></img>
            <h5 className="font-bold text-dark text-center">
              <em>The White Rose </em>
            </h5>
          </div>

          <div className="col-lg-3 col-md-6 col-12 m-0 p-3">
            <img
              src="./s3.webp"
              alt="Flower 4"
              className="w-100 h-75 my-3 object-fit-cover"
            ></img>
            <h5 className="font-bold text-dark text-center">
              <em>Red Rose Bouquet </em>
            </h5>
          </div>
        </div>
      </div>

      <div className="row m-0 p-3 bg-light">
        <div className="col-lg-10 col-12 m-0 p-0 m-auto">
          <div className="row m-0 p-5">
            <div className="col-lg-6 col-12">
              <img
                src="./p1.jpg"
                className="w-100 h-100 object-fit-cover"
              ></img>
            </div>
            <div className="col-lg-6 col-12">
              <img
                src="./p2.jpg"
                className="w-100 h-100 object-fit-cover"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
