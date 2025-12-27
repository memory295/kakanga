'use client';

import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

// Animation components
const AnimatedSection = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const { ref, inView } = useInView({ threshold: 0.1, once: false });
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const AnimatedServiceCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const { ref, inView } = useInView({ threshold: 0.1, once: false });
  
  return (
    <div 
      ref={ref}
      className={`bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 group ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {children}
    </div>
  );
};

const services = [
  {
    id: "house-design-construction",
    title: "House Design and Construction",
    description:
      "We professionally design structures and construct. We also construct all kinds of designs presented to us. Trust us, we will transform your document/plan into that reality as planned without changing any feature or dimensions on the plan.",
    image: "/images/project.png",
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
    image: "/images/project.png",
    features: [
      "Culvert Installation",
      "Surface Reshaping",
      "Bridge Construction",
      "Drainage Systems",
    ],
  },
  {
    id: "land-leveling",
    title: "Land Leveling & Grading",
    description:
      "Professional land leveling and grading services to prepare your construction site. We ensure optimal drainage and foundation preparation for all types of construction projects.",
    image: "/images/project.png",
    features: [
      "Site Preparation",
      "Drainage Solutions",
      "Foundation Grading",
      "Soil Compaction",
    ],
  },
  {
    id: "drilling-blasting",
    title: "Drilling & Blasting",
    description:
      "Expert drilling and controlled blasting operations for road construction, quarrying, and site preparation. We prioritize safety and precision in all explosive operations.",
    image: "/images/project.png",
    features: [
      "Controlled Blasting",
      "Rock Excavation",
      "Quarry Operations",
      "Safety Protocols",
    ],
  },
];

export default function ServicesPage() {
  return (
    <Layout>
      <PageHeader 
        title="Our Services"
      />
      
      {/* Services Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="text-header font-semibold text-sm uppercase tracking-wider mb-2 block">
                What We Offer
              </span>
              <h2 className="heading-3 mb-4">
                Comprehensive Construction & Engineering Solutions
              </h2>
              <p className="body-base max-w-3xl mx-auto">
                From initial design to project completion, we provide full-service 
                construction and engineering solutions tailored to meet your specific needs.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={service.id} delay={index * 200}>
                <AnimatedServiceCard index={index}>
                  <div 
                    className={`grid lg:grid-cols-2 gap-8 items-center p-6 ${
                      index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                    }`}
                  >
                    <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="overflow-hidden rounded-lg shadow-md">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-64 lg:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                    </div>
                
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <h3 className="heading-4 mb-4">{service.title}</h3>
                  <p className="body-base mb-6">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-header rounded-full"></div>
                        <span className="body-small text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link href="/contact">
                    <Button className="group bg-header hover:bg-header/90 text-white">
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </AnimatedServiceCard>
          </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="heading-3 text-foreground mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="body-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and detailed quote. 
              Let's bring your construction vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Get Free Quote
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}