import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    visible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-24 right-6 bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full shadow-xl transition duration-300 hover:scale-110 z-50"
      >
        <ChevronUp size={26} />
      </button>
    )
  );
}

export default ScrollToTop;