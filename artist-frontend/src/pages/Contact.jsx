import { Phone, Mail, MapPin, Facebook, Instagram,Youtube } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-light-gradient text-black dark:bg-dark-gradient dark:text-white transition-colors duration-300 px-6">
      <div
        className="bg-light-gradient text-black dark:bg-dark-gradient dark:text-white 
        border border-gray-300 dark:border-gray-700 
        shadow-md rounded px-8 py-10 max-w-2xl w-full text-center"
      >
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        <p className="text-gray-700 dark:text-gray-300 mb-6">
          We'd love to hear from you! Reach out to us through any of the options
          below:
        </p>

        <div className="space-y-4 text-left">
          <p className="flex items-center gap-3">
            <Phone className="text-[#70d6ff]" />
            <a href="tel:+917804996135" className="hover:underline">
              +91 78049 96135
            </a>
          </p>

          <p className="flex items-center gap-3">
            <Mail className="text-[#70d6ff]" />
            <a
              href="mailto:indorisingers@gmail.com"
              className="hover:underline"
            >
              support@indoriartist.com
            </a>
          </p>
          <p className="flex items-center gap-3">
            <Phone className="text-[#25D366]" />
            <a
              href="https://wa.me/+917804996135"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              WhatsApp
            </a>
          </p>

          <p className="flex items-center gap-3">
            <MapPin className="text-[#70d6ff]" />
            Indore, Madhya Pradesh, India
          </p>

          <div className="flex gap-6 justify-center mt-6">
            <a
              href="https://www.instagram.com/indori_singers?utm_source=qr&igsh=bjdsdDVwbzl0Z2xn"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#70d6ff]"
            >
              <Facebook size={24} />
            </a>
            <a
              href="https://www.instagram.com/indori_singers?utm_source=qr&igsh=bjdsdDVwbzl0Z2xn"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#70d6ff]"
            >
              <Instagram size={24} />
            </a>
            <a
              href="https://youtu.be/u4w5Ismml10?si=fpZq9q7TondCD8oy"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#70d6ff]"
            >
              <Youtube size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
