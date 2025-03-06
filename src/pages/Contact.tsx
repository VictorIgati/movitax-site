import { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

interface ContactFormProps {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const Contact = () => {
  const [contactForm, setContactForm] = useState<ContactFormProps>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { toast } = useToast();

  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const handleMapClick = () => {
    window.open('https://maps.app.goo.gl/g7ygYNG6CJTsYu4JA', '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Store submission in Supabase database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([contactForm]);

      if (dbError) throw new Error(dbError.message);

      // Send email using Supabase Edge Function
      let emailSent = false;

      // Try Supabase Edge Function first
      try {
        const response = await supabase.functions.invoke('send-contact-email', {
          body: contactForm,
        });

        if (!response.error) {
          emailSent = true;
        }
      } catch (edgeFunctionError) {
        console.log("Supabase Edge Function failed, trying Netlify function...");
      }

      // If Supabase Edge Function fails, try Netlify function
      if (!emailSent) {
        const netlifyResponse = await fetch('/.netlify/functions/send-contact-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contactForm),
        });

        if (!netlifyResponse.ok) {
          throw new Error("Failed to send email via Netlify function");
        }
      }

      toast({
        title: "Message Sent",
        description: "We've received your message and will contact you soon.",
      });

      // Reset form fields
      setContactForm({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
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

  return (
    <>
      <Navbar />
      <div ref={formRef} className="contact-form">
        <h1 ref={titleRef}>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={contactForm.name}
            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={contactForm.email}
            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
          />
          <input
            type="tel"
            placeholder="Phone"
            value={contactForm.phone}
            onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
          />
          <input
            type="text"
            placeholder="Service"
            value={contactForm.service}
            onChange={(e) => setContactForm({ ...contactForm, service: e.target.value })}
          />
          <textarea
            placeholder="Message"
            value={contactForm.message}
            onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
          />
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
      <div ref={infoRef} className="contact-info">
        <div onClick={handleMapClick}>
          <MapPin /> Our Location
        </div>
        <div>
          <Phone /> +123456789
        </div>
        <div>
          <Mail /> contact@example.com
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;

