
import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactCTA from '@/components/ContactCTA';
import { 
  BarChart3, 
  CalculatorIcon, 
  ChevronDown, 
  FileText, 
  PieChart, 
  ShieldCheck, 
  TrendingUp, 
  Users 
} from 'lucide-react';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

const Services = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    serviceRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => {
      if (titleRef.current) observer.unobserve(titleRef.current);
      serviceRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const services = [
    {
      id: "tax",
      title: "Tax Planning & Compliance",
      description: "Strategic tax planning and compliance services to minimize liabilities while ensuring full regulatory adherence.",
      icon: <CalculatorIcon size={32} />,
      benefits: [
        "Minimize tax liabilities through strategic planning",
        "Ensure compliance with all tax regulations",
        "Stay updated on tax law changes and implications",
        "Proactive approach to identify tax-saving opportunities"
      ],
      content: `Our tax planning and compliance services go beyond simply filing returns. We develop comprehensive tax strategies that align with your financial goals, whether you're an individual or a business. Our experts stay current with ever-changing tax regulations, ensuring you remain compliant while taking advantage of all available deductions and credits.`,
      subservices: [
        {
          title: "Personal Tax Services",
          description: "Comprehensive tax planning and preparation for individuals."
        },
        {
          title: "Business Tax Services",
          description: "Strategic tax planning and compliance for businesses of all sizes."
        },
        {
          title: "International Tax Planning",
          description: "Navigating complex international tax matters for global operations."
        },
        {
          title: "Tax Controversy Resolution",
          description: "Expert representation in tax disputes and audits."
        }
      ]
    },
    {
      id: "audit",
      title: "Audit & Assurance",
      description: "Comprehensive audit services that provide stakeholders with confidence in financial reporting and operational integrity.",
      icon: <FileText size={32} />,
      benefits: [
        "Enhance credibility of financial statements",
        "Identify and address operational inefficiencies",
        "Strengthen internal control systems",
        "Improve financial reporting processes"
      ],
      content: `Our audit and assurance services provide stakeholders with confidence in your financial reporting. We conduct thorough examinations of financial statements and operational processes, identifying risks and opportunities for improvement. Our approach goes beyond compliance, delivering insights that enhance your business operations and financial management.`,
      subservices: [
        {
          title: "Financial Statement Audits",
          description: "Comprehensive examination of financial statements for accuracy and compliance."
        },
        {
          title: "Internal Audits",
          description: "Evaluating internal controls and operational effectiveness."
        },
        {
          title: "Compliance Audits",
          description: "Ensuring adherence to regulatory requirements and standards."
        },
        {
          title: "SOC Reporting",
          description: "System and Organization Controls reporting for service organizations."
        }
      ]
    },
    {
      id: "advisory",
      title: "Financial Advisory",
      description: "Expert guidance on financial decisions, risk management, and strategic planning for sustainable growth.",
      icon: <BarChart3 size={32} />,
      benefits: [
        "Make informed financial decisions with expert guidance",
        "Develop effective risk management strategies",
        "Improve financial performance and efficiency",
        "Access specialized expertise for complex financial matters"
      ],
      content: `Our financial advisory services provide strategic guidance for complex financial decisions. Whether you're planning for growth, managing risk, or navigating financial challenges, our advisors bring deep expertise and a tailored approach to help you achieve your objectives. We work closely with you to understand your unique situation and develop solutions that drive results.`,
      subservices: [
        {
          title: "Strategic Financial Planning",
          description: "Developing comprehensive financial plans aligned with business objectives."
        },
        {
          title: "Risk Management",
          description: "Identifying, assessing, and mitigating financial risks."
        },
        {
          title: "Transaction Advisory",
          description: "Guidance for mergers, acquisitions, and other financial transactions."
        },
        {
          title: "Valuation Services",
          description: "Accurate business and asset valuations for various purposes."
        }
      ]
    },
    {
      id: "consulting",
      title: "Business Consulting",
      description: "Tailored consulting services to optimize operations, enhance performance, and achieve business objectives.",
      icon: <TrendingUp size={32} />,
      benefits: [
        "Optimize business operations and efficiency",
        "Develop effective growth strategies",
        "Improve organizational performance",
        "Implement best practices across your organization"
      ],
      content: `Our business consulting services help you optimize operations, enhance performance, and achieve your strategic objectives. Our consultants bring industry expertise and a fresh perspective, identifying opportunities for improvement and implementing practical solutions. We partner with you to drive meaningful change and sustainable results, whether you're looking to streamline processes, enter new markets, or transform your business model.`,
      subservices: [
        {
          title: "Strategic Planning",
          description: "Developing and implementing effective business strategies."
        },
        {
          title: "Operational Improvement",
          description: "Enhancing efficiency and effectiveness of business operations."
        },
        {
          title: "Technology Consulting",
          description: "Leveraging technology solutions to improve business performance."
        },
        {
          title: "Change Management",
          description: "Guiding organizations through transformational changes."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24">
        <section className="py-16 md:py-20 bg-movitax-lightGray">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-3 px-3 py-1 bg-movitax-blue/10 text-movitax-blue rounded-full text-sm font-medium">
                Our Services
              </div>
              
              <h1 
                ref={titleRef}
                className="text-4xl md:text-5xl font-bold mb-6 text-movitax-darkGray reveal"
              >
                Comprehensive Financial Solutions
              </h1>
              
              <p className="text-lg text-movitax-darkGray/70">
                Tailored financial services designed to help you achieve your goals, 
                delivered with expertise and a personalized approach.
              </p>
            </div>
          </div>
        </section>
        
        {services.map((service, index) => (
          <section 
            key={service.id} 
            id={service.id} 
            className={`py-16 md:py-24 ${index % 2 === 1 ? 'bg-movitax-lightGray' : ''}`}
          >
            <div className="container mx-auto px-6">
              <div 
                ref={el => serviceRefs.current[index] = el}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center reveal"
              >
                <div className={`${index % 2 === 1 ? 'order-1 lg:order-2' : ''}`}>
                  <div className="w-16 h-16 mb-6 rounded-lg bg-movitax-blue/10 flex items-center justify-center text-movitax-blue">
                    {service.icon}
                  </div>
                  
                  <h2 className="text-3xl font-bold mb-4 text-movitax-darkGray">
                    {service.title}
                  </h2>
                  
                  <p className="text-lg mb-6 text-movitax-darkGray/70">
                    {service.description}
                  </p>
                  
                  <p className="mb-8 text-movitax-darkGray/70">
                    {service.content}
                  </p>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-movitax-darkGray">Key Benefits</h3>
                    <ul className="space-y-3">
                      {service.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <div className="text-movitax-blue mr-3 flex-shrink-0 mt-1">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-movitax-darkGray/80">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className={`${index % 2 === 1 ? 'order-2 lg:order-1' : ''}`}>
                  <div className="glass-card p-8 rounded-xl">
                    <h3 className="text-xl font-semibold mb-6 text-movitax-darkGray">
                      {service.title} Services
                    </h3>
                    
                    <Accordion type="single" collapsible className="space-y-4">
                      {service.subservices.map((subservice, i) => (
                        <AccordionItem 
                          key={i} 
                          value={`item-${i}`}
                          className="border border-movitax-blue/10 rounded-lg overflow-hidden"
                        >
                          <AccordionTrigger className="px-4 py-3 hover:bg-movitax-blue/5 text-left font-medium">
                            {subservice.title}
                          </AccordionTrigger>
                          <AccordionContent className="px-4 py-3 bg-white/50">
                            {subservice.description}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    
                    <div className="mt-8">
                      <a 
                        href="/contact" 
                        className="inline-flex items-center text-movitax-blue font-medium hover:underline"
                      >
                        <span>Request a consultation</span>
                        <ChevronDown className="ml-2 h-4 w-4 rotate-[-90deg]" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
        
        <section className="py-16 bg-blue-gradient text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                The Movitax Advantage
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Experienced Team</h3>
                  <p className="text-white/80">
                    Our professionals bring decades of industry experience to every client engagement.
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <PieChart className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Tailored Approach</h3>
                  <p className="text-white/80">
                    We develop customized solutions based on your unique needs and objectives.
                  </p>
                </div>
                
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Trusted Advisor</h3>
                  <p className="text-white/80">
                    We build long-term relationships based on trust, integrity, and exceptional service.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <ContactCTA />
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
