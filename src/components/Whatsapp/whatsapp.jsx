import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "250785996668";

const WHATSAPP_MESSAGE = "Hi, I would like to contact Elyse Tech.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

function WhatsApp() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl text-3xl z-50 transition duration-300 hover:scale-110"
      aria-label="Chat with Elyse Tech on WhatsApp"
      title="Chat with Elyse Tech on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}

export default WhatsApp;