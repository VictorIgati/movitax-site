
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
    // Scroll to top when route changes
    window.scrollTo(0, 0);
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={cn(
        'fixed w-full z-50 transition-all duration-300',
        isScrolled
          ? 'py-3 bg-white shadow-md backdrop-blur-lg bg-opacity-90'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <NavLink to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/758955b7-d279-45d6-b6e6-2b6ff8667b05.png" 
            alt="Movitax Consultants" 
            className="h-16 md:h-20 object-contain transition-all duration-300"
          />
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) => cn('nav-link', isActive && 'active')}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => cn('nav-link', isActive && 'active')}
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => cn('nav-link', isActive && 'active')}
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => cn('nav-link', isActive && 'active')}
          >
            Contact
          </NavLink>
          <NavLink 
            to="/contact" 
            className="btn-primary"
          >
            Get Started
          </NavLink>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-movitax-darkGray hover:text-movitax-blue transition-colors"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div
        className={cn(
          'fixed inset-0 bg-white bg-opacity-95 backdrop-blur-lg md:hidden z-40 transition-transform duration-300 transform',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ top: '60px' }}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8 p-6">
          <NavLink
            to="/"
            className={({ isActive }) => 
              cn('text-2xl font-medium', isActive ? 'text-movitax-blue' : 'text-movitax-darkGray')
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => 
              cn('text-2xl font-medium', isActive ? 'text-movitax-blue' : 'text-movitax-darkGray')
            }
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) => 
              cn('text-2xl font-medium', isActive ? 'text-movitax-blue' : 'text-movitax-darkGray')
            }
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) => 
              cn('text-2xl font-medium', isActive ? 'text-movitax-blue' : 'text-movitax-darkGray')
            }
          >
            Contact
          </NavLink>
          <NavLink 
            to="/contact" 
            className="btn-primary mt-4 text-center w-full max-w-xs"
          >
            Get Started
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
