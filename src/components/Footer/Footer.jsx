import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-3xl font-bold text-cyan-500">
            Elyse Tech
          </h2>

          <p className="mt-4 text-gray-400">
            Professional laptop repair, smartphone repair, software installation,
            networking, and IT support in Nyamata, Bugesera.
          </p>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4">
            Our Services
          </h3>

          <ul className="space-y-2 text-gray-400">
            <li>Laptop Repair</li>
            <li>Smartphone Repair</li>
            <li>Software Installation</li>
            <li>Networking</li>
            <li>IT Support</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4">
            Contact
          </h3>

          <div className="space-y-3 text-gray-400">

            <div className="flex gap-3">
              <Phone size={18}/>
              <span>+250 790 059 779</span>
            </div>

            <div className="flex gap-3">
              <Mail size={18}/>
              <span>info@elysetech.com</span>
            </div>

            <div className="flex gap-3">
              <MapPin size={18}/>
              <span>Nyamata, Bugesera, Rwanda</span>
            </div>

          </div>
        </div>

        <div>
          <h3 className="font-bold text-xl mb-4">
            Follow Us
          </h3>

          <div className="flex gap-5 text-2xl">
            <FaFacebookF className="cursor-pointer hover:text-cyan-500 transition"/>
            <FaInstagram className="cursor-pointer hover:text-cyan-500 transition"/>
          </div>
        </div>

      </div>

      <div className="border-t border-slate-700 mt-12 pt-6 text-center text-gray-400">
        © 2026 Elyse Tech. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;