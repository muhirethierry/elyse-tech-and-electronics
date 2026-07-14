import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Services from "./components/Services/services";
import WhyChoose from "./components/WhyChoose/whychoose";
import Statistics from "./components/Statistics/Statistics";
import Portfolio from "./components/Portfolio/Portfolio";
import Testimonials from "./components/Testimonials/Testimonials";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import WhatsApp from "./components/Whatsapp/whatsapp";
import ScrollToTop from "./components/scrolltotop/scrolltotop";
function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyChoose />
      <Statistics />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsApp />
      <ScrollToTop />
    </>
  );
}

export default App;
