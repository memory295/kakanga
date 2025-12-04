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
    id: "land-leveling",
    title: "Land Leveling",
    description: "Professional land leveling and grading services for construction sites, agricultural land, and development projects. We ensure precise elevation control and proper drainage.",
    image: serviceLandLeveling,
    features: ["Site Preparation", "Grading & Leveling", "Drainage Solutions", "Earthmoving"],
  },
  {
    id: "road-works",
    title: "Road Works",
    description: "Comprehensive road construction and rehabilitation services including new road construction, road maintenance, and surface treatments for all types of roads.",
    image: serviceRoadWorks,
    features: ["New Road Construction", "Road Rehabilitation", "Surface Treatments", "Drainage Systems"],
  },
  {
    id: "drilling",
    title: "Drilling & Blasting",
    description: "Specialized drilling and controlled blasting operations for mining, quarrying, and construction projects. Safety and precision are our top priorities.",
    image: serviceDrilling,
    features: ["Rock Drilling", "Controlled Blasting", "Quarry Operations", "Foundation Drilling"],
  },
  {
    id: "concrete",
    title: "Concrete Works",
    description: "High-quality concrete works including structural concrete, foundations, retaining walls, and specialized concrete structures for various applications.",
    image: serviceConcrete,
    features: ["Structural Concrete", "Foundations", "Retaining Walls", "Concrete Structures"],
  },
  {
    id: "earthworks",
    title: "Earthworks & Excavation",
    description: "Expert earthworks and excavation services for site development, including bulk earthmoving, trenching, and foundation excavation.",
    image: serviceLandLeveling,
    features: ["Bulk Earthmoving", "Trenching", "Foundation Excavation", "Site Clearing"],
  },
  {
    id: "bridges",
    title: "Bridge Construction",
    description: "Design and construction of bridges and culverts using modern techniques and materials to ensure durability and structural integrity.",
    image: serviceRoadWorks,
    features: ["Bridge Design", "Culvert Installation", "Structural Works", "Rehabilitation"],
  },
];

const ServicesPage = () => {
  return (
    <Layout>
      <PageHeader title="Our Services" />
      
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              What We <span className="text-primary">Offer</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide comprehensive construction services with a commitment to quality, 
              safety, and timely delivery
            </p>
          </div>

          <div className="space-y-16">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className={`grid lg:grid-cols-2 gap-8 items-center ${
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
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h3 className="text-2xl md:text-3xl font-bold font-heading mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <span className="text-sm">{feature}</span>
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
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container-wide px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="mb-8 max-w-2xl mx-auto opacity-90">
            Contact us today to discuss your construction needs and get a free quote
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="gap-2">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
