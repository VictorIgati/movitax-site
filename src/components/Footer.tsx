
import { NavLink } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-movitax-darkGray text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-6">
              Movi<span className="text-movitax-blue">tax</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Professional tax consultancy and advisory services for individuals and businesses.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons (placeholders) */}
              <a href="#" className="w-10 h-10 rounded-full bg-movitax-blue flex items-center justify-center hover:bg-opacity-80 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-movitax-blue flex items-center justify-center hover:bg-opacity-80 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><NavLink to="/" className="text-gray-300 hover:text-white transition-colors">Home</NavLink></li>
              <li><NavLink to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</NavLink></li>
              <li><NavLink to="/services" className="text-gray-300 hover:text-white transition-colors">Services</NavLink></li>
              <li><NavLink to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</NavLink></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Our Services</h3>
            <ul className="space-y-3">
              <li><NavLink to="/services#audit" className="text-gray-300 hover:text-white transition-colors">Audit & Assurance</NavLink></li>
              <li><NavLink to="/services#tax" className="text-gray-300 hover:text-white transition-colors">Tax Management</NavLink></li>
              <li><NavLink to="/services#business" className="text-gray-300 hover:text-white transition-colors">Business Advisory</NavLink></li>
              <li><NavLink to="/services#financial" className="text-gray-300 hover:text-white transition-colors">Financial Advisory</NavLink></li>
              <li><NavLink to="/services#secretarial" className="text-gray-300 hover:text-white transition-colors">Corporate Secretarial</NavLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-movitax-blue flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">
                  Bishop Magua Plaza, 3rd Floor Suite 306<br />
                  Biashara Street, Kiambu Town<br />
                  P.O. Box 26224 – 00504 Nairobi
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-movitax-blue flex-shrink-0" />
                <a href="tel:+254723617013" className="text-gray-300 hover:text-white transition-colors">+254-723-617013</a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-movitax-blue flex-shrink-0" />
                <a href="mailto:movitaxconsultants@gmail.com" className="text-gray-300 hover:text-white transition-colors">movitaxconsultants@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Movitax Consultants. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
