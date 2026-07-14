"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import repair1 from "../../assets/Portifolio/repair1.jpg";

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-white py-24"
    >
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <div className="flex justify-center">
          <div className="w-full max-w-md h-[450px] rounded-2xl shadow-lg overflow-hidden bg-slate-100">
            <img
              src={repair1}
              alt="Elyse Tech Team"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div>

          <p className="text-cyan-600 font-semibold uppercase tracking-widest">
            About Elyse Tech
          </p>

          <h2 className="text-5xl font-bold mt-3 text-slate-900">
            Professional Electronics & IT Solutions
          </h2>

          <p className="text-gray-600 mt-6 leading-8">
            Elyse Tech & Electronics Solution provides professional laptop repair,
            smartphone repair, software installation, networking, IT support and
            electronics maintenance for individuals, schools and businesses.
          </p>

          {/* FEATURES */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">

            <div className="flex items-center gap-3">
              <CheckCircle className="text-cyan-600" />
              <span>Professional Laptop Repair</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-cyan-600" />
              <span>Smartphone Repair</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-cyan-600" />
              <span>Software Installation</span>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="text-cyan-600" />
              <span>Networking & IT Support</span>
            </div>

          </div>

          {/* EXTRA TRUST POINTS */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-600">
            <p>✔ Fast Service</p>
            <p>✔ Affordable Price</p>
            <p>✔ Certified Technicians</p>
            <p>✔ 24/7 Support</p>
          </div>

          {/* BUTTON */}
          <button className="mt-10 bg-cyan-600 text-white px-8 py-3 rounded-xl hover:bg-cyan-700 transition hover:scale-105">
            Learn More
          </button>

        </div>

      </div>
    </motion.section>
  );
}