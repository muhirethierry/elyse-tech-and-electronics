import { useState } from "react";
import { Phone, MapPin, Mail } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Email is invalid";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setErrors({});
    setStatus("sending");

    // Simulate submission — replace with real endpoint (Formspree, Netlify, etc.)
    setTimeout(() => {
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 900);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-cyan-600 uppercase tracking-widest">
            Contact Us
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mt-3">
            Get In Touch
          </h2>

          <p className="text-gray-600 mt-4">
            We'd love to hear from you. Contact us for professional IT and electronics services.
          </p>
        </div>

        {/* Contact Info + Form */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Information */}
          <div className="space-y-8">

            <div className="flex items-center gap-5">
              <Phone className="text-cyan-600" size={32} />
              <div>
                <h3 className="font-bold text-lg">Phone</h3>
                <p className="text-gray-600">+250 790 059 779</p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <MapPin className="text-cyan-600" size={32} />
              <div>
                <h3 className="font-bold text-lg">Location</h3>
                <p className="text-gray-600">
                  Nyamata, Bugesera, Rwanda
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5">
              <Mail className="text-cyan-600" size={32} />
              <div>
                <h3 className="font-bold text-lg">Email</h3>
                <p className="text-gray-600">
                  info@elysetech.com
                </p>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex gap-5 pt-4">
              <a
                href="https://facebook.com/elysetechsolution"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center hover:bg-cyan-700 transition"
              >
                <FaFacebookF size={20} />
              </a>

              <a
                href="https://instagram.com/elysetechsolution"
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center hover:bg-cyan-700 transition"
              >
                <FaInstagram size={20} />
              </a>
            </div>

          </div>

          {/* Contact Form */}
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>

            <div>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                type="text"
                placeholder="Your Name"
                aria-label="Your Name"
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
            </div>

            <div>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Your Email"
                aria-label="Your Email"
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
            </div>

            <div>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                type="text"
                placeholder="Subject"
                aria-label="Subject"
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                placeholder="Your Message"
                aria-label="Your Message"
                className="w-full border border-gray-300 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              ></textarea>
              {errors.message && <p className="text-sm text-red-600 mt-1">{errors.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-4 rounded-xl transition font-semibold"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
              {status === "success" && <p className="text-sm text-green-600 mt-3">Message sent — we will reply soon.</p>}
            </div>

          </form>

        </div>

        {/* Google Map */}
        <div className="mt-10">
          <h3 className="text-3xl font-bold text-center text-slate-900 mb-8">
            Find Our Location
          </h3>

          <div className="overflow-hidden rounded-2xl shadow-2xl border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.0345260881327!2d30.083014374488823!3d-2.1404490371552347!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19c354b8b0a37e77%3A0xe3d11f6d7f8c2205!2sNyamata%20Market!5e0!3m2!1sen!2srw!4v1783687442821!5m2!1sen!2srw"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Elyse Tech Location"
            ></iframe>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;