
import { useEffect, useRef } from 'react';
import { BarChart3, CalculatorIcon, FileText, TrendingUp } from 'lucide-react';
import AnimatedCard from './AnimatedCard';
import { cn } from '@/lib/utils';

const ServicesSection = ({ className }: { className?: string }) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    
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
    
    if (title) observer.observe(title);
    if (subtitle) observer.observe(subtitle);
    
    return () => {
      if (title) observer.unobserve(title);
      if (subtitle) observer.unobserve(subtitle);
    };
  }, []);

  const services = [
    {
      icon: <CalculatorIcon size={32} />,
      title: 'Tax Planning',
      description: 'Strategic tax planning to minimize liabilities and maximize financial efficiency for individuals and businesses.',
    },
    {
      icon: <FileText size={32} />,
      title: 'Audit & Assurance',
      description: 'Comprehensive audit services to ensure compliance and provide stakeholders with confidence in financial reporting.',
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Financial Advisory',
      description: 'Expert guidance on financial decisions, risk management, and strategic planning for sustainable growth.',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Business Consulting',
      description: 'Tailored consulting services to optimize operations, enhance performance, and achieve business objectives.',
    },
  ];

  return (
    <section id="services" className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-6">
        <h2 
          ref={titleRef}
          className="section-title text-center reveal"
        >
          Our Services
        </h2>
        
        <p 
          ref={subtitleRef}
          className="section-subtitle text-center reveal"
        >
          Comprehensive financial solutions tailored to your unique needs, delivered with expertise and precision
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <AnimatedCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
