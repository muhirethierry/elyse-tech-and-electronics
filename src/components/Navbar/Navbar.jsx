import "./Navbar.css";
import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo/logo.png";

function Navbar() {
  const [nav, setNav] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollOffset = -80;

  const menuItems = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Services", to: "services" },
    { name: "Portfolio", to: "portfolio" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950 shadow-xl py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="home"
            smooth={true}
            duration={900}
            offset={scrollOffset}
            className="flex items-center gap-3 cursor-pointer"
          >
            <img
              src={logo}
              alt="Elyse Tech logo"
              className="h-10 w-auto object-contain"
            />
            <div className="leading-tight">
              <h1 className="text-3xl font-bold text-white">
                <span className="text-cyan-400">ELYSE</span> TECH
              </h1>

              <p className="text-xs text-gray-300">Electronics Solution</p>
            </div>
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8 text-white">

          {menuItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.to}
                smooth={true}
                duration={900}
                spy={true}
                offset={scrollOffset}
                activeClass="active-link"
                className="relative cursor-pointer text-white hover:text-cyan-400 transition duration-300 after:absolute after:left-0 after:-bottom-2 after:h-0.5 after:w-0 after:bg-cyan-400 after:content-[''] after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            </li>
          ))}
  
        </ul>

        {/* Mobile Button */}
        <button
          onClick={() => setNav(!nav)}
          aria-label="Toggle navigation"
          aria-controls="mobile-menu"
          aria-expanded={nav}
          className="md:hidden text-white text-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded"
        >
          {nav ? <FaTimes /> : <FaBars />}
        </button>

      </div>

      {/* Mobile Menu */}
      {nav && (
        <div id="mobile-menu" className="md:hidden bg-slate-900 text-white">

          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={900}
              offset={scrollOffset}
              onClick={() => setNav(false)}
              className="block px-8 py-5 border-b border-slate-700 cursor-pointer hover:bg-slate-800 focus:outline-none focus:bg-slate-800"
            >
              {item.name}
            </Link>
          ))}

        </div>
      )}

    </nav>
  );
}

export default Navbar;
