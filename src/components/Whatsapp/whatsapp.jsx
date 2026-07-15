import { FaWhatsapp } from "react-icons/fa";

function WhatsApp() {
  return (
    <a
      href="https://wa.me/250790059779?text=Welcome%20to%20Elyse%20Tech!%20How%20can%20we%20help%20you%20today%3F"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl text-3xl z-50 transition duration-300 hover:scale-110"
      aria-label="Chat with Elyse Tech on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsApp;          
