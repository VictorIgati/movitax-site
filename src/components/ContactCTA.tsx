
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useRef, useEffect } from 'react';

const ContactCTA = () => {
  const navigate = useNavigate();
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }
    
    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-blue-gradient text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20"></div>
      
      <div 
        ref={ctaRef}
        className="container mx-auto px-6 relative z-10 reveal"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Optimize Your Financial Strategy?
          </h2>
          
          <p className="text-lg mb-8 text-white/80">
            Our expert team is ready to help you navigate the complexities of finance and taxation. 
            Get in touch today for a personalized consultation.
          </p>
          
          <button 
            onClick={() => navigate('/contact')}
            className="bg-white text-movitax-blue font-medium py-3 px-8 rounded-md inline-flex items-center space-x-2 shadow-lg transition-all duration-300 hover:bg-opacity-90 hover:translate-y-[-2px]"
          >
            <span>Contact Us</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
