import { motion } from "framer-motion";
import { Link } from "react-scroll";
import logo from "../../assets/logo/logo.png";

function Hero() {
  return (
    <section
  id="home"
  className="min-h-screen pt-32 pb-16 bg-linear-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex items-center"
>
    <div className="max-w-7xl mx-auto px-6 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-cyan-400 uppercase tracking-widest mb-3 text-sm sm:text-base">
            Welcome to Elyse Tech
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Repair.
            <br />
            Innovate.
            <br />
            <span className="text-cyan-400">Transform.</span>
          </h1>

          <p className="mt-6 text-gray-300 text-base sm:text-lg leading-7 sm:leading-8 max-w-xl">
            We provide professional laptop repair, smartphone repair,
            software installation, networking, CCTV installation,
            electronics maintenance and IT support for homes and businesses.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4">
            <Link
              to="services"
              smooth={true}
              duration={900}
              offset={-100}
              spy={true}
              className="w-full sm:w-auto bg-cyan-500 px-7 py-3 rounded-xl font-semibold hover:bg-cyan-600 transition text-center cursor-pointer"
            >
              Our Services
            </Link>

            <Link
              to="contact"
              smooth={true}
              duration={900}
              offset={-100}
              spy={true}
              className="w-full sm:w-auto border border-cyan-500 px-7 py-3 rounded-xl hover:bg-cyan-500 transition text-center cursor-pointer"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center mt-10 md:mt-0"
        >
          <div className="w-full max-w-lg flex justify-center">
            <div className="relative z-0 w-80 sm:w-96 md:w-[34rem] lg:w-[40rem] h-80 sm:h-96 md:h-[34rem] lg:h-[40rem] rounded-full overflow-hidden bg-white/5 flex items-center justify-center drop-shadow-2xl ring-2 ring-white/10">
              <img
                src={logo}
                alt="Elyse Tech Logo"
                  className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
          </div>
          </motion.div>

      </div>
    </section>
  );
}

export default Hero;