import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    alert("Thank you! Your message has been sent.");

    setFormData({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  return (
    <div className="bg-light">

    
      <section className="container-fluid bg-light py-5">

        <div className="container py-5">

          <div className="row justify-content-center text-center">

            <div className="col-lg-8">

              <small className="text-secondary fw-semibold">
                GET IN TOUCH
              </small>

              <h1 className="display-3 mt-3">
                <em>Let's talk</em>
              </h1>

              <p className="text-secondary mt-4">
                Have a question, want a custom bouquet, or planning
                something special? We'd love to hear from you.
              </p>

            </div>

          </div>

        </div>

      </section>


     

      <section className="container py-5">

        <div className="row g-5">

          {/* LEFT - CONTACT INFORMATION */}

          <div className="col-lg-5">

            <div className="pe-lg-5">

              <small className="text-secondary fw-semibold">
                CONTACT US
              </small>

              <h2 className="display-6 mt-3">
                <em>We'd love to hear from you.</em>
              </h2>

              <p className="text-secondary mt-4">
                Whether you have a question about our flowers,
                need help choosing the perfect arrangement, or
                want to create something completely unique,
                our team is here to help.
              </p>


              {/* Email */}

              <div className="d-flex align-items-start mt-5">

                <div className="fs-4 me-3">
                  ✉
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Email
                  </h6>

                  <p className="text-secondary mb-0">
                    hello@fiama.com
                  </p>
                </div>

              </div>


              {/* Phone */}

              <div className="d-flex align-items-start mt-4">

                <div className="fs-4 me-3">
                  ☎
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Phone
                  </h6>

                  <p className="text-secondary mb-0">
                    +91 98765 43210
                  </p>
                </div>

              </div>


              {/* Address */}

              <div className="d-flex align-items-start mt-4">

                <div className="fs-4 me-3" >
                  ♡
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Visit us
                  </h6>

                  <p className="text-secondary mb-0">
                    123 Flower Street,
                    <br />
                    Pune, Maharashtra
                  </p>
                </div>

              </div>


              {/* Opening Hours */}

              <div className="d-flex align-items-start mt-4">

                <div className="fs-4 me-3">
                  ◷
                </div>

                <div>
                  <h6 className="fw-bold mb-1">
                    Opening Hours
                  </h6>

                  <p className="text-secondary mb-0">
                    Monday - Saturday
                    <br />
                    9:00 AM - 7:00 PM
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* RIGHT - CONTACT FORM */}

          <div className="col-lg-7">

            <div className="bg-white p-4 p-md-5 shadow-sm">

              <h3 className="fw-normal mb-4">
                <em>Send us a message</em>
              </h3>

              <form onSubmit={handleSubmit}>

                {/* Name */}

                <div className="mb-4">

                  <label
                    htmlFor="name"
                    className="form-label small fw-semibold"
                  >
                    YOUR NAME
                  </label>

                  <input
                    type="text"
                    className="form-control rounded-0 py-3"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* Email */}

                <div className="mb-4">

                  <label
                    htmlFor="email"
                    className="form-label small fw-semibold"
                  >
                    EMAIL ADDRESS
                  </label>

                  <input
                    type="email"
                    className="form-control rounded-0 py-3"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>


                {/* Phone */}

                <div className="mb-4">

                  <label
                    htmlFor="phone"
                    className="form-label small fw-semibold"
                  >
                    PHONE NUMBER
                  </label>

                  <input
                    type="tel"
                    className="form-control rounded-0 py-3"
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                </div>


                {/* Message */}

                <div className="mb-4">

                  <label
                    htmlFor="message"
                    className="form-label small fw-semibold"
                  >
                    YOUR MESSAGE
                  </label>

                  <textarea
                    className="form-control rounded-0"
                    id="message"
                    name="message"
                    rows="5"
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>

                </div>


                {/* Submit */}

                <button
                  type="submit"
                  className="btn btn-dark rounded-0 px-5 py-3"
                >
                  SEND MESSAGE
                </button>

              </form>

            </div>

          </div>

        </div>

      </section>


      
      <section className="container-fluid py-5 bg-light">

        <div className="container py-5">

          <div className="row justify-content-center text-center">

            <div className="col-lg-8">

              <div className="display-4 mb-3">
                ❀
              </div>

              <h2 className="display-6">
                <em>Every flower tells a story.</em>
              </h2>

              <p className="text-secondary mt-3">
                Let us help you tell yours.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Contact;