
import { CheckCircle, XCircle } from "lucide-react";

const ServiceComparison = () => {
  const services = [
    {
      name: "Basic Tax Planning",
      price: "$299",
      features: [
        { name: "Personal Tax Return Preparation", included: true },
        { name: "Basic Tax Planning", included: true },
        { name: "Electronic Filing", included: true },
        { name: "Year-Round Support", included: false },
        { name: "Business Tax Services", included: false },
        { name: "Strategic Financial Planning", included: false },
      ],
      recommended: false,
    },
    {
      name: "Business Advisory",
      price: "$599",
      features: [
        { name: "Personal Tax Return Preparation", included: true },
        { name: "Basic Tax Planning", included: true },
        { name: "Electronic Filing", included: true },
        { name: "Year-Round Support", included: true },
        { name: "Business Tax Services", included: true },
        { name: "Strategic Financial Planning", included: false },
      ],
      recommended: true,
    },
    {
      name: "Comprehensive Solutions",
      price: "$999",
      features: [
        { name: "Personal Tax Return Preparation", included: true },
        { name: "Basic Tax Planning", included: true },
        { name: "Electronic Filing", included: true },
        { name: "Year-Round Support", included: true },
        { name: "Business Tax Services", included: true },
        { name: "Strategic Financial Planning", included: true },
      ],
      recommended: false,
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-4 text-center text-movitax-darkGray">
          Compare Our Services
        </h2>
        <p className="text-lg mb-12 text-center text-movitax-darkGray/70 max-w-3xl mx-auto">
          Choose the service package that best fits your financial needs
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`glass-card rounded-xl p-6 transition-all duration-300 hover:shadow-xl ${
                service.recommended ? 'border-2 border-movitax-blue relative transform hover:-translate-y-2' : 'hover:-translate-y-1'
              }`}
            >
              {service.recommended && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-movitax-blue text-white px-4 py-1 rounded-full text-sm font-medium">
                  Recommended
                </div>
              )}
              
              <h3 className="text-xl font-bold mb-2 text-movitax-darkGray">
                {service.name}
              </h3>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-movitax-blue">{service.price}</span>
                <span className="text-movitax-darkGray/70"> / year</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    {feature.included ? (
                      <CheckCircle className="text-movitax-blue h-5 w-5 mr-3 flex-shrink-0" />
                    ) : (
                      <XCircle className="text-movitax-darkGray/40 h-5 w-5 mr-3 flex-shrink-0" />
                    )}
                    <span className={feature.included ? 'text-movitax-darkGray' : 'text-movitax-darkGray/40'}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-2 px-4 rounded-md transition-colors ${
                service.recommended 
                  ? 'bg-movitax-blue text-white hover:bg-movitax-blue/90' 
                  : 'bg-movitax-lightGray text-movitax-darkGray hover:bg-movitax-lightGray/80'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceComparison;
