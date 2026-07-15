"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X, Award, Users, Zap, BookOpen } from "lucide-react";
import repair1 from "../../assets/Portifolio/repair1.jpg";

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

          {/* BUTTON */}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-10 bg-cyan-600 text-white px-8 py-3 rounded-xl hover:bg-cyan-700 transition hover:scale-105"
          >
            Learn More
          </button>

        </div>

      </div>

      {/* MODERN MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-0 flex items-center justify-center z-50 px-4"
            >
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-cyan-600 to-cyan-700 px-8 py-8 text-white flex justify-between items-start">
                  <div>
                    <h2 className="text-3xl font-bold">About Elyse Tech</h2>
                    <p className="text-cyan-100 mt-2">Professional Electronics & IT Solutions</p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-cyan-500 rounded-full transition"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Content */}
                <div className="px-8 py-8 space-y-8">

                  {/* Company Story */}
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <BookOpen className="text-cyan-600" size={24} />
                      Our Story
                    </h3>
                    <p className="text-gray-600 leading-7">
                      Elyse Tech & Electronics Solution was founded with a mission to provide professional, 
                      reliable, and affordable IT and electronics services to individuals, schools, and businesses. 
                      With years of expertise in the industry, we've built a reputation for excellence and customer satisfaction.
                    </p>
                  </div>

                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-cyan-50 to-blue-50 p-5 rounded-xl border border-cyan-200"
                    >
                      <div className="text-3xl font-bold text-cyan-600">5+</div>
                      <div className="text-gray-600 text-sm mt-1">Years Experience</div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-cyan-50 to-blue-50 p-5 rounded-xl border border-cyan-200"
                    >
                      <div className="text-3xl font-bold text-cyan-600">1000+</div>
                      <div className="text-gray-600 text-sm mt-1">Clients Served</div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-cyan-50 to-blue-50 p-5 rounded-xl border border-cyan-200"
                    >
                      <div className="text-3xl font-bold text-cyan-600">500+</div>
                      <div className="text-gray-600 text-sm mt-1">Projects Completed</div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-gradient-to-br from-cyan-50 to-blue-50 p-5 rounded-xl border border-cyan-200"
                    >
                      <div className="text-3xl font-bold text-cyan-600">99%</div>
                      <div className="text-gray-600 text-sm mt-1">Satisfaction Rate</div>
                    </motion.div>
                  </div>

                  {/* Team & Credentials */}
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Users className="text-cyan-600" size={24} />
                      Our Team & Credentials
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Award className="text-cyan-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="font-semibold text-gray-900">Certified Technicians</p>
                          <p className="text-gray-600 text-sm">All team members are certified in hardware repair and software solutions</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="text-cyan-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="font-semibold text-gray-900">Industry Partnerships</p>
                          <p className="text-gray-600 text-sm">Authorized service partners with leading tech brands</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Award className="text-cyan-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <p className="font-semibold text-gray-900">Continuous Training</p>
                          <p className="text-gray-600 text-sm">Regular updates on latest technology and repair techniques</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* What We Offer */}
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Zap className="text-cyan-600" size={24} />
                      Our Expertise
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        "Laptop Repair & Maintenance",
                        "Smartphone Repair & Services",
                        "Software Installation & Setup",
                        "Networking & IT Support",
                        "Data Recovery Solutions",
                        "System Optimization",
                        "Business IT Consultation",
                        "Hardware Upgrades"
                      ].map((service, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="text-cyan-600 flex-shrink-0" size={18} />
                          <span className="text-gray-700 text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                      setIsModalOpen(false);
                    }}
                    className="w-full bg-cyan-600 text-white py-3 rounded-xl font-semibold hover:bg-cyan-700 transition"
                  >
                    Get in Touch
                  </motion.button>

                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
