
import { useState, useEffect, useRef, FormEvent } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === formRef.current) {
            entry.target.classList.add('reveal-visible-right');
          } else if (entry.target === infoRef.current) {
            entry.target.classList.add('reveal-visible-left');
          } else {
            entry.target.classList.add('reveal-visible');
          }
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
    if (formRef.current) observer.observe(formRef.current);
    if (infoRef.current) observer.observe(infoRef.current);

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      if (formRef.current) observer.unobserve(formRef.current);
      if (infoRef.current) observer.unobserve(infoRef.current);
    };
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Store submission in Supabase database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([
          { name, email, phone, service, message }
        ]);
      
      if (dbError) throw new Error(dbError.message);
      
      // Send email using Supabase Edge Function
      const response = await supabase.functions.invoke('send-contact-email', {
        body: { name, email, phone, service, message }
      });
      
      if (!response.error) {
        toast({
          title: "Message Sent",
          description: "We've received your message and will contact you soon.",
        });
        
        // Reset form fields
        setName('');
        setEmail('');
        setPhone('');
        setService('');
        setMessage('');
      } else {
        throw new Error(response.error.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMapClick = () => {
    window.open('https://maps.app.goo.gl/g7ygYNG6CJTsYu4JA', '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-16 md:py-20 bg-movitax-lightGray">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-3 px-3 py-1 bg-movitax-blue/10 text-movitax-blue rounded-full text-sm font-medium">
                Contact Us
              </div>
              
              <h1 
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold mb-6 text-movitax-darkGray reveal"
              >
                Get in Touch
              </h1>
              
              <p className="text-lg text-movitax-darkGray/70">
                Have questions or ready to start working with us? 
                Reach out today and our team will be happy to assist you.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div 
                ref={formRef}
                className="glass-card p-8 rounded-xl reveal"
              >
                <h2 className="text-2xl font-bold mb-6 text-movitax-darkGray">
                  Send Us a Message
                </h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-movitax-darkGray mb-1">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-md border border-movitax-darkGray/20 focus:border-movitax-blue focus:outline-none focus:ring-1 focus:ring-movitax-blue transition-all"
                        placeholder="John Smith"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-movitax-darkGray mb-1">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-3 rounded-md border border-movitax-darkGray/20 focus:border-movitax-blue focus:outline-none focus:ring-1 focus:ring-movitax-blue transition-all"
                        placeholder="johnsmith@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-movitax-darkGray mb-1">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-movitax-darkGray/20 focus:border-movitax-blue focus:outline-none focus:ring-1 focus:ring-movitax-blue transition-all"
                        placeholder="+254-XXX-XXXXXX"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-movitax-darkGray mb-1">
                        Service of Interest
                      </label>
                      <select
                        id="service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-4 py-3 rounded-md border border-movitax-darkGray/20 focus:border-movitax-blue focus:outline-none focus:ring-1 focus:ring-movitax-blue transition-all"
                      >
                        <option value="">Select a service</option>
                        <option value="audit">Audit & Assurance</option>
                        <option value="tax">Tax Management</option>
                        <option value="business">Business Advisory</option>
                        <option value="financial">Financial Advisory</option>
                        <option value="secretarial">Corporate Secretarial</option>
                        <option value="other">Other Services</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-movitax-darkGray mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-md border border-movitax-darkGray/20 focus:border-movitax-blue focus:outline-none focus:ring-1 focus:ring-movitax-blue transition-all"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full flex justify-center items-center"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </div>
              
              <div 
                ref={infoRef}
                className="reveal"
              >
                <h2 className="text-2xl font-bold mb-8 text-movitax-darkGray">
                  Contact Information
                </h2>
                
                <div className="space-y-8">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-movitax-blue/10 flex items-center justify-center text-movitax-blue mr-4 flex-shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-movitax-darkGray">
                        Our Office
                      </h3>
                      <p className="text-movitax-darkGray/70">
                        Bishop Magua Plaza, 3rd Floor Suite 306<br />
                        Biashara Street, Kiambu Town<br />
                        P.O. Box 26224 – 00504 Nairobi
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-movitax-blue/10 flex items-center justify-center text-movitax-blue mr-4 flex-shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-movitax-darkGray">
                        Phone
                      </h3>
                      <p className="text-movitax-darkGray/70">
                        <a href="tel:+254723617013" className="hover:text-movitax-blue transition-colors">
                          +254-723-617013
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-movitax-blue/10 flex items-center justify-center text-movitax-blue mr-4 flex-shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2 text-movitax-darkGray">
                        Email
                      </h3>
                      <p className="text-movitax-darkGray/70">
                        <a href="mailto:movitaxconsultants@gmail.com" className="hover:text-movitax-blue transition-colors">
                          movitaxconsultants@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-12">
                  <h3 className="text-lg font-medium mb-4 text-movitax-darkGray">
                    Business Hours
                  </h3>
                  <div className="space-y-2 text-movitax-darkGray/70">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>8:00 AM - 1:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-movitax-lightGray">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold mb-8 text-center text-movitax-darkGray">
              Our Location
            </h2>
            
            <div 
              onClick={handleMapClick}
              className="w-full h-96 rounded-xl overflow-hidden shadow-lg cursor-pointer relative group"
            >
              <div 
                className="w-full h-full bg-cover bg-center transition-all duration-300 group-hover:scale-105" 
                style={{ 
                  backgroundImage: 'url("https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80")',
                  filter: 'grayscale(0.3)'
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 px-4 py-2 rounded-md text-movitax-darkGray font-medium">
                  Open in Google Maps
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
