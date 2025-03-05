
import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/ContactCTA';
import { Award, CheckCircle, Shield, Users } from 'lucide-react';
import AnimatedCard from '@/components/AnimatedCard';

const About = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    };

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    if (titleRef.current) observer.observe(titleRef.current);
    if (historyRef.current) observer.observe(historyRef.current);
    if (valuesRef.current) observer.observe(valuesRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (historyRef.current) observer.unobserve(historyRef.current);
      if (valuesRef.current) observer.unobserve(valuesRef.current);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-16 md:py-20 bg-movitax-lightGray">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-3 px-3 py-1 bg-movitax-blue/10 text-movitax-blue rounded-full text-sm font-medium">
                About Us
              </div>
              
              <h1 
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold mb-6 text-movitax-darkGray reveal"
              >
                Your Trusted Financial Partner
              </h1>
              
              <p className="text-lg text-movitax-darkGray/70">
                Movitax Consultants is a medium sized auditing firm licensed to practice as public accountants 
                by the Institute of Certified Public Accountants of Kenya (ICPAK).
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div 
              ref={historyRef}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal"
            >
              <div className="relative">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Movitax Consultants office"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="absolute -top-6 -left-6 w-3/4 h-3/4 bg-movitax-blue/20 rounded-2xl z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-1/2 h-1/2 bg-movitax-gold/20 rounded-2xl z-0"></div>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold mb-6 text-movitax-darkGray">
                  The Firm
                </h2>
                
                <p className="text-movitax-darkGray/70 mb-6">
                  Movitax Consultants is a medium sized auditing firm licensed to practice as public accountants by the 
                  Institute of Certified Public Accountants of Kenya (ICPAK). The firm is managed by a qualified practitioner, 
                  associates and support staff.
                </p>
                
                <p className="text-movitax-darkGray/70 mb-6">
                  We provide assurance, taxation and advisory services in all industry sectors through our approach 
                  based on our core values.
                </p>
                
                <p className="text-movitax-darkGray/70">
                  The firm is located at Bishop Magua Plaza, 3rd Floor Suite 306, along Biashara Street, Kiambu Town.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-movitax-darkGray text-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Vision & Mission</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="glass-card bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-semibold mb-4 text-movitax-blue">Our Vision</h3>
                <p className="text-white/90 text-lg">
                  To be the most highly respected professional firm in the region where clients come for peace of mind.
                </p>
              </div>
              
              <div className="glass-card bg-white/5 p-8 rounded-xl backdrop-blur-sm border border-white/10">
                <h3 className="text-2xl font-semibold mb-4 text-movitax-blue">Our Mission</h3>
                <p className="text-white/90 text-lg">
                  To provide our services in a timely, efficient and innovative manner to satisfy client's needs.
                </p>
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Core Values (AUDIIT)</h2>
            
            <div 
              ref={valuesRef}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal"
            >
              <AnimatedCard
                title="Accountability"
                description="Meeting our obligations responsibly and with utmost openness."
                icon={<CheckCircle className="h-8 w-8" />}
                className="bg-white/5 border border-white/10"
              />
              
              <AnimatedCard
                title="Unity"
                description="Belief in teamwork and unity of purpose."
                icon={<Users className="h-8 w-8" />}
                className="bg-white/5 border border-white/10"
              />
              
              <AnimatedCard
                title="Dedication"
                description="To deliver our services with quality and efficiency."
                icon={<Award className="h-8 w-8" />}
                className="bg-white/5 border border-white/10"
              />
              
              <AnimatedCard
                title="Innovation"
                description="Seeking better/smarter ways to serve our clients."
                icon={<Shield className="h-8 w-8" />}
                className="bg-white/5 border border-white/10"
              />
              
              <AnimatedCard
                title="Integrity"
                description="Upholding professionalism and highest ethical standards."
                icon={<Shield className="h-8 w-8" />}
                className="bg-white/5 border border-white/10"
              />
              
              <AnimatedCard
                title="Trust"
                description="A firm belief in the reliability of our staff and partners."
                icon={<Shield className="h-8 w-8" />}
                className="bg-white/5 border border-white/10"
              />
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <h2 className="section-title text-center">Our Approach</h2>
            <p className="section-subtitle text-center">
              How we work with our clients to deliver exceptional results
            </p>
            
            <div className="mt-12 glass-card p-8 rounded-xl">
              <p className="text-movitax-darkGray/80 mb-6">
                We give a lot of emphasis in constant communication with management throughout the course of the engagement 
                as we have discovered that this normally has a big impact on the effectiveness of our performance.
              </p>
              
              <p className="text-movitax-darkGray/80">
                Our audit approach is principally risk-based and focuses on obtaining an understanding of the scope of the 
                assignment and developing an audit strategy to achieve the set audit objectives. A high level of partner 
                involvement in each audit undertaken gives you a sense of security and a regular contact to deal with.
              </p>
            </div>
          </div>
        </section>
        
        <ContactCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
