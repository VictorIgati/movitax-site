
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollPosition = window.scrollY;
      const translateY = scrollPosition * 0.4;
      heroRef.current.style.transform = `translateY(${translateY}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    navigate('/contact');
  };

  const scrollToContent = () => {
    const contentSection = document.getElementById('content-section');
    if (contentSection) {
      contentSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-movitax-lightGray">
      <div 
        ref={heroRef} 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
          backgroundAttachment: 'fixed',
          backgroundPosition: '50% 50%',
          filter: 'brightness(0.85)'
        }}
      ></div>
      
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 to-white/50 z-10"></div>
      
      <div className="container mx-auto px-6 pt-24 pb-16 relative z-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-movitax-darkGray animate-fade-in" style={{ animationDelay: '300ms' }}>
            Strategic Financial <br />
            <span className="text-movitax-blue">Guidance & Solutions</span>
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-movitax-darkGray/80 animate-fade-in" style={{ animationDelay: '600ms' }}>
            Navigating the complexities of taxation and financial planning with precision and expertise. Your success is our priority.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '900ms' }}>
            <button onClick={handleGetStarted} className="btn-primary">
              Get Started
            </button>
            
            <button onClick={() => navigate('/services')} className="btn-secondary">
              Explore Services
            </button>
          </div>
        </div>
      </div>
      
      <button 
        onClick={scrollToContent}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all hover:bg-white animate-bounce"
        style={{ animationDuration: '2s' }}
      >
        <ChevronDown className="text-movitax-darkGray" />
      </button>
    </div>
  );
};

export default HeroSection;
