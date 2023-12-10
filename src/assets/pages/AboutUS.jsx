import React from "react";
import Navbar from "../components/Navbar";
import IMAGES from "../../Images/Images";

const AboutUS = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {/* Hero Section */}
      <div className="text-center py-16 bg-blue-600 text-white flex justify-center flex-col items-center">
        <h1 className="text-4xl font-bold mb-2">About Us</h1>
        <p className="text-xl w-1/2 text-left">
          Welcome to Dyary, where innovation meets excellence. <br /> We are a
          dynamic team dedicated to providing exceptional services and products
          that enrich lives and empower individuals and organizations. <br />
          <br /> Our journey began in 2019, fueled by a vision to make a
          significant impact in our industry. Our Mission At Dyary, our mission
          is simple: to deliver outstanding solutions with a blend of
          cutting-edge technology and unmatched customer service.
          <br /> <br />
          We believe in creating value for our clients, understanding their
          needs, and exceeding their expectations. Our Vision Our vision is to
          be recognized as a leading company in our field, known for our
          innovative approach, sustainable practices, and commitment to
          excellence. We aim to set new standards, be at the forefront of
          industry advancements, and make a positive difference in the
          communities we serve.{" "}
        </p>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-6 py-10 flex flex-col justify-center items-center">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Our Story
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed w-1/2 text-left">
          Our Story Humble Beginnings Our story is one of passion, perseverance,
          and pursuit of excellence. What started as a small team with big
          dreams in a modest workspace has now grown into a reputable company
          with a global footprint. Our founder, Dyary Yassin, started Dyary
          Company with a clear vision and a deep understanding of the industry's
          challenges and opportunities. Growth and Expansion Over the years, we
          have expanded our services, diversified our product offerings, and
          grown our team of talented professionals.
          <br /> <br />
          We've navigated through various challenges, adapting to changes and
          evolving with the times. Our growth is a testament to our team's hard
          work, dedication, and innovative spirit. Milestones and Achievements
          We are proud of the milestones we have achieved. From launching our
          first product to expanding our services globally, each achievement has
          been a stepping stone towards greater success. We've received
          accolades and recognition from industry leaders, which motivates us to
          continue our pursuit of excellence. Building Relationships Our clients
          are at the heart of everything we do.
          <br />
          <br />
          We've built strong relationships based on trust, reliability, and
          mutual respect. We value the feedback and insights from our clients,
          as they are instrumental in our continuous improvement and innovation.
          Looking Ahead As we look to the future, we are excited about the
          possibilities and opportunities that lie ahead. We remain committed to
          our mission and vision, continuously striving to improve, innovate,
          and lead by example. Join us on our journey as we continue to make a
          difference and set new benchmarks in our industry.
        </p>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {/* Repeat for each team member */}
          <div className="max-w-sm rounded overflow-hidden shadow-lg">
            <img
              className="w-full h-48 object-cover"
              src={IMAGES.Image1}
              alt="Team Member"
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">Dyary Yassin</div>
              <p className="text-gray-700 text-base">
                Software Engineering Student at AUIS
              </p>
            </div>
          </div>
          {/* End Repeat */}
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="bg-blue-600 text-white py-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-white mb-8">
            Contact Us
          </h2>
          <form
            className="w-full max-w-lg mx-auto"
            action="https://formsubmit.co/dyaryyasin165@gmail.com"
            method="POST"
          >
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              name="name"
              type="text"
              required
              placeholder="Your Name"
            />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              name="email"
              type="email"
              required
              placeholder="Your Email"
            />
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
              name="message"
              placeholder="Your Message"
              rows="4"
              required
            ></textarea>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AboutUS;
