import { FaWhatsapp, FaFacebook, FaFacebookMessenger, FaPhone } from "react-icons/fa";
import "./SocialBar.css";

const SocialBar = () => {
  return (
    <div className="social-bar">
      {/* Facebook */}
      <a href="https://www.facebook.com/markazulquranwassunnah" target="_blank" rel="noopener noreferrer"
        className="social-icon facebook" data-tooltip="Join Facebook"><FaFacebook /></a>
      {/* WhatsApp */}
      <a href="https://wa.me/8801974018621" target="_blank" rel="noopener noreferrer"
        className="social-icon whatsapp" data-tooltip="Chat on WhatsApp"><FaWhatsapp /></a>
      {/* Messenger */}
      <a href="https://m.me/markazulquranwassunnah" target="_blank" rel="noopener noreferrer"
        className="social-icon messenger" data-tooltip="Chat on Messenger"><FaFacebookMessenger /></a>
      {/* Call */}
      <a href="tel:+8801974018621" className="social-icon call" data-tooltip="Call Us"><FaPhone /></a>
    </div>
  );
};

export default SocialBar;