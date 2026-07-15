"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Wrench, Users, Award, Headphones } from "lucide-react";

const stats = [
  { icon: <Wrench size={45} />, end: 500, suffix: "+", title: "Devices Repaired" },
  { icon: <Users size={45} />, end: 300, suffix: "+", title: "Happy Customers" },
  { icon: <Award size={45} />, end: 5, suffix: "+", title: "Years Experience" },
  { icon: <Headphones size={45} />, end: 24, suffix: "/7", title: "Customer Support" },
];

// SAFE COUNTER
function useCounter(start, end, shouldStart) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!shouldStart) return;

    let current = start;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      current += increment;

      if (current >= end) {
        current = end;
        clearInterval(timer);
      }

      setCount(Math.floor(current));
    }, 16);

    return () => clearInterval(timer);
  }, [shouldStart, end, start]);

  return count;
}

function StatCard({ stat, start }) {
  const count = useCounter(0, stat.end, start);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{
        y: -10,
        scale: 1.05,
        boxShadow: "0px 20px 40px rgba(0, 255, 255, 0.25)",
      }}
      className="
        bg-white/95 rounded-2xl p-8 text-center
        shadow-lg transition-all duration-300
        hover:shadow-cyan-400/40
        border border-cyan-100 hover:border-cyan-400
        relative z-10
      "
    >
      <motion.div
        className="flex justify-center text-cyan-600 mb-5"
        whileHover={{
          rotate: 10,
          scale: 1.2,
          filter: "drop-shadow(0px 0px 10px rgba(0, 255, 255, 0.6))",
        }}
        transition={{ duration: 0.3 }}
      >
        {stat.icon}
      </motion.div>

      <h2 className="text-5xl font-bold text-slate-900">
        <span className="text-cyan-600">{count}</span>
        {stat.suffix}
      </h2>

      <p className="mt-4 text-gray-600 font-medium">
        {stat.title}
      </p>
    </motion.div>
  );
}

export default function Statistics() {
  const ref = useRef(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-24 bg-cyan-600 relative overflow-hidden"
    >

      {/* 🌊 Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-cyan-300/30 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-300/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>
        <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-2xl top-1/2 left-1/2 animate-bounce"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white">
            Our Achievements
          </h2>
          <p className="text-cyan-100 mt-4">
            Numbers that reflect our commitment to quality service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatCard key={index} stat={stat} start={start} />
          ))}
        </div>

      </div>
    </section>
  );
}