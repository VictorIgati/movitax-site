
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger 
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "What services does Movitax offer?",
      answer: "Movitax offers a comprehensive range of financial services including tax planning and preparation, audit and assurance, financial advisory, business consulting, and wealth management solutions tailored to both individuals and businesses."
    },
    {
      question: "How can I schedule a consultation?",
      answer: "You can schedule a consultation by filling out our contact form, calling our office directly, or sending us an email. One of our representatives will get back to you within 24 hours to arrange a meeting that fits your schedule."
    },
    {
      question: "Do you work with businesses of all sizes?",
      answer: "Yes, we serve clients ranging from individual entrepreneurs and small startups to medium-sized businesses and large corporations. Our team has experience across various industries and can scale our services to meet your specific needs."
    },
    {
      question: "What makes Movitax different from other financial firms?",
      answer: "Movitax stands out through our personalized approach, industry expertise, and commitment to long-term client relationships. We combine innovative technology with human expertise to deliver solutions that are both effective and tailored to your unique financial situation."
    },
    {
      question: "How do your fee structures work?",
      answer: "Our fee structures vary depending on the services required. We offer fixed-fee arrangements for specific projects, monthly retainers for ongoing services, and hourly rates for consultations. We prioritize transparency and will discuss all costs upfront before any engagement begins."
    }
  ];

  return (
    <section className="py-12 bg-movitax-lightGray">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-movitax-darkGray">
          Frequently Asked Questions
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="bg-white rounded-xl shadow-md">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="px-6 py-4 text-movitax-darkGray hover:text-movitax-blue">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-movitax-darkGray/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
