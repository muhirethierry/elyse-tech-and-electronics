"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Laptop,
  Smartphone,
  Monitor,
  Network,
  ShieldCheck,
  Wrench,
  X,
} from "lucide-react";

const services = [
  {
    icon: <Laptop size={40} />,
    title: "Laptop Repair",
    description:
      "Professional diagnosis, hardware replacement, and maintenance for all laptop brands.",
    details:
      "We diagnose hardware and software issues, replace faulty components, and optimize performance.",
    includes: [
      "Screen replacement",
      "Battery replacement",
      "Keyboard/trackpad repair",
      "Virus and software troubleshooting",
    ],
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: <Smartphone size={40} />,
    title: "Phone Repair",
    description:
      "Screen replacement, battery replacement, charging ports, cameras, and software fixes.",
    details:
      "We repair damaged smartphones with careful diagnostics, quality spare parts, and reliable after-service support.",
    includes: [
      "Screen replacement",
      "Battery replacement",
      "Charging port repair",
      "Camera and speaker repair",
    ],
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: <Monitor size={40} />,
    title: "Software Installation",
    description:
      "Windows installation, Microsoft Office, drivers, antivirus, and software troubleshooting.",
    details:
      "We install, configure, and troubleshoot the software you need to keep your computer secure and productive.",
    includes: [
      "Windows installation",
      "Office setup",
      "Driver installation",
      "Antivirus and troubleshooting",
    ],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: <Network size={40} />,
    title: "Networking",
    description:
      "Network setup, Wi-Fi installation, router configuration, and business networking.",
    details:
      "We design and support dependable network solutions for homes, schools, offices, and businesses.",
    includes: [
      "Router configuration",
      "Wi-Fi installation",
      "Network troubleshooting",
      "Business connectivity setup",
    ],
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: <ShieldCheck size={40} />,
    title: "IT Support",
    description:
      "Reliable IT support for homes, schools, offices, and businesses.",
    details:
      "We provide proactive technical support to keep systems running smoothly and reduce downtime.",
    includes: [
      "Device setup",
      "System maintenance",
      "Performance optimization",
      "Remote and onsite support",
    ],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    icon: <Wrench size={40} />,
    title: "Electronics Maintenance",
    description:
      "Repair and maintenance of electronic devices with quality service.",
    details:
      "We maintain and repair electronic equipment to extend device lifespan and improve everyday reliability.",
    includes: [
      "Routine checks",
      "Component repair",
      "Device testing",
      "Preventive maintenance",
    ],
    image:
      "https://images.unsplash.com/photo-1580894908361-967195033215?auto=format&fit=crop&w=900&q=80",
  },
];

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="py-20 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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

          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3">
            We Repair, Install & Support
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto text-sm sm:text-base">
            Elyse Tech provides professional electronics repair and IT
            solutions for individuals, schools, offices, and businesses
            across Rwanda.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 auto-rows-max">
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
              className="group relative overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-white transition-all h-full flex flex-col"
            >
              <div
                className="absolute inset-0 bg-cover bg-center opacity-100 transition-all duration-300 md:opacity-0 md:group-hover:opacity-100"
                style={{ backgroundImage: `url(${service.image})` }}
              />
              <div className="absolute inset-0 bg-slate-950/75 opacity-100 transition-all duration-300 md:bg-slate-950/80 md:opacity-0 md:group-hover:opacity-100" />

              <div className="relative z-10 p-6 sm:p-8 flex flex-col h-full">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-600 mb-6 transition-all group-hover:bg-white/20 group-hover:text-white">
                  {service.icon}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 transition-colors group-hover:text-white">
                  {service.title}
                </h3>

                <p className="text-gray-600 mt-4 leading-7 grow transition-colors group-hover:text-slate-100">
                  {service.description}
                </p>

                <button
                  onClick={() => setSelectedService(service)}
                  className="mt-6 cursor-pointer text-cyan-600 font-semibold hover:text-cyan-700 self-start transition-colors group-hover:text-white"
                >
                  Learn More →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl"
          >
            <button
              onClick={() => setSelectedService(null)}
              className="absolute right-4 top-4 rounded-full bg-slate-100 p-2 text-slate-600 transition hover:bg-cyan-100 hover:text-cyan-700"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-100 text-cyan-600">
                {selectedService.icon}
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-600">
                  Service Details
                </p>
                <h3 className="text-3xl font-bold text-slate-900">
                  {selectedService.title}
                </h3>
              </div>
            </div>

            <p className="mt-6 text-base leading-7 text-slate-700">
              {selectedService.details}
            </p>

            <div className="mt-6">
              <h4 className="text-lg font-semibold text-slate-900">
                Includes
              </h4>

              <ul className="mt-3 space-y-2 text-slate-700">
                {selectedService.includes.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setSelectedService(null);
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                className="rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"
              >
                Contact Us
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-700"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}