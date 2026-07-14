"use client";

import { motion } from "framer-motion";
import {
  Laptop,
  Smartphone,
  Monitor,
  Network,
  ShieldCheck,
  Wrench,
} from "lucide-react";

const services = [
  {
    icon: <Laptop size={40} />,
    title: "Laptop Repair",
    description:
      "Professional diagnosis, hardware replacement, and maintenance for all laptop brands.",
  },
  {
    icon: <Smartphone size={40} />,
    title: "Phone Repair",
    description:
      "Screen replacement, battery replacement, charging ports, cameras, and software fixes.",
  },
  {
    icon: <Monitor size={40} />,
    title: "Software Installation",
    description:
      "Windows installation, Microsoft Office, drivers, antivirus, and software troubleshooting.",
  },
  {
    icon: <Network size={40} />,
    title: "Networking",
    description:
      "Network setup, Wi-Fi installation, router configuration, and business networking.",
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "IT Support",
    description:
      "Reliable IT support for homes, schools, offices, and businesses.",
  },
  {
    icon: <Wrench size={40} />,
    title: "Electronics Maintenance",
    description:
      "Repair and maintenance of electronic devices with quality service.",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-cyan-600 uppercase tracking-widest font-semibold">
            Our Services
          </p>

          <h2 className="text-5xl font-bold text-slate-900 mt-3">
            We Repair, Install & Support
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Elyse Tech provides professional electronics repair and IT
            solutions for individuals, schools, offices, and businesses
            across Rwanda.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:border-cyan-400 transition-all"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 mb-6">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                {service.title}
              </h3>

              <p className="text-gray-600 mt-4 leading-7">
                {service.description}
              </p>

              <button className="mt-6 text-cyan-600 font-semibold hover:text-cyan-700">
                Learn More →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}