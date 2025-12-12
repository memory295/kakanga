import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import serviceLandLeveling from "@/assets/service-land-leveling.jpg";
import serviceRoadWorks from "@/assets/service-road-works.jpg";
import serviceDrilling from "@/assets/service-drilling.jpg";
import serviceConcrete from "@/assets/service-concrete.jpg";

const services = [
  {
    id: "house-design-construction",
    title: "House Design and Construction",
    description:
      "We professionally design structures and construct. We also construct all kinds of designs presented to us. Trust us, we will transform your document/plan into that reality as planned without changing any feature or dimensions on the plan.",
    image: serviceConcrete,
    features: [
      "Architectural Design",
      "Structural Engineering",
      "Plan-to-Reality Execution",
      "Quality Finishes",
    ],
  },
  {
    id: "civil-works",
    title: "Civil Works",
    description:
      "Installing culverts for drainage, reshaping surfaces for smooth travel, and building small bridges for safe crossings — improving roads for better access and less maintenance.",
    image: serviceRoadWorks,
    features: [
      "Culvert Installation",
      "Surface Reshaping",
      "Small Bridges",
      "Road Improvements",
    ],
  },
  {
    id: "prefabricated-structures",
    title: "Prefabricated Structures",
    description:
      "We offer professional installation of prefabricated structures, including panel buildings and steel warehouses. Our process includes site preparation, foundation laying, and quick assembly of pre-made walls, roofs, and frames. With precise factory-made components, we ensure fast, cost effective, and durable construction — perfect for warehouses, workshops, and storage facilities.",
    image: serviceLandLeveling,
    features: [
      "Site Preparation",
      "Foundations",
      "Quick Assembly",
      "Warehouses & Workshops",
    ],
  },
  {
    id: "materials-supply",
    title: "Supply of Construction Materials",
    description:
      "We provide end-to-end import solutions for prefabricated structures and materials from China, ensuring quality, compliance, and timely delivery.",
    image: serviceDrilling,
    features: [
      "Sourcing & Procurement",
      "Quality Assurance",
      "Customs & Compliance",
      "Timely Delivery",
    ],
  },
  {
    id: "steel-structures",
    title: "Steel Structures Construction",
    description:
      "We build different infrastructures, for example houses or offices, foam and concrete works, and masonry works.",
    image: serviceConcrete,
    features: [
      "Steel Framing",
      "Concrete & Masonry",
      "Industrial & Commercial",
      "Office & Housing",
    ],
  },
];

const ServicesPage = () => {
  return (
    <Layout>
      <PageHeader title="Our Services" backgroundImage="/images/services-cta.jpg" />
      
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive construction services with a commitment to quality, 
              safety, and timely delivery
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`grid lg:grid-cols-2 gap-8 items-start ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={service.image} 
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? 'lg:order-1' : ''} flex flex-col justify-start`}>
                  <h3 className="heading-3 mb-4 mt-0">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="body-small">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/contact">
                    <Button className="gap-2">
                      Get Quote <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 bg-[#1a1a2e] text-white">
        {/* Background image with strong overlay for better text readability */}
        <div className="absolute inset-0">
          <img
            src="/images/services-cta.jpg"
            alt=""
            className="w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a2e]/85 via-[#1a1a2e]/75 to-[#1a1a2e]/85" />
        </div>
        <div className="container-wide px-4 text-center relative z-10">
          <h2 className="heading-2 mb-4 text-white drop-shadow-lg">
            Ready to Start Your Project?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto text-white/95 text-lg leading-relaxed drop-shadow-md">
            Contact us today to discuss your construction needs and get a free quote
          </p>
          <Link to="/contact">
            <Button variant="default" size="lg" className="gap-2 bg-primary text-white hover:bg-primary/90 shadow-lg">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
