import { useState } from "react";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill all required fields");
      return;
    }

    console.log("Submitted Data:", formData);
    alert("Message sent successfully!");

    setFormData({
      name: "",
      email: "",
      category: "General Inquiry",
      message: "",
    });
  };

  return (
    <div className="bg-[#fdfaf7] min-h-screen px-4 py-12">
      {/* This Is Header */}
      <div className="max-w-6xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#4a2c1f] mb-4">
          We'd love to hear from you
        </h1>
        <p className="text-gray-600 max-w-2xl">
          Whether you have questions about adopting a pet, donating supplies,
          or just want to say hi, we are here to help.
        </p>
      </div>

      {/* From Here Main Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Contact Information */}
        <div className="bg-[#f4eddf] rounded-2xl p-8 space-y-6">
          <h2 className="text-xl font-semibold text-[#4a2c1f]">
            Contact Information
          </h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-semibold text-gray-500">ADDRESS</p>
              <p>123 Paws Avenue<br />Pet City, PC 90210</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">PHONE</p>
              <p>(555) 123-4567</p>
              <p className="text-sm text-gray-500">Mon–Fri 9am–6pm</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-500">EMAIL</p>
              <p>hello@petdonations.com</p>
            </div>
          </div>

          {/* Image Card */}
          <div className="relative mt-6">
            <img
              src=""
              alt="Dog"
              className="rounded-xl w-full h-56 object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-black/70 text-white p-3 rounded-lg text-sm">
              <p className="font-semibold">Visit our shelter</p>
              <p>Open for visits daily 10am – 4pm</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl p-8 shadow-sm space-y-6"
        >
          <div>
            <h2 className="text-2xl font-semibold text-[#4a2c1f]">
              Send a message
            </h2>
            <p className="text-sm text-gray-500">
              We usually respond within 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option>General Inquiry</option>
            <option>Adoption</option>
            <option>Donation</option>
            <option>Volunteer</option>
          </select>

          <textarea
            name="message"
            rows="5"
            placeholder="Tell us more about your inquiry..."
            value={formData.message}
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <p className="text-xs text-gray-500">
            By clicking send, you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Service</span>.
          </p>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
          >
            Send Message →
          </button>
        </form>
      </div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto mt-12 bg-[#f4eddf] text-center py-5 rounded-xl">
        Have a quick question?{" "}
        <span className="text-orange-600 font-semibold cursor-pointer">
          Check our FAQ →
        </span>
      </div>
    </div>
  );
}

export default ContactUs;
