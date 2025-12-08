import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import landLevelingImg from '@/assets/service-land-leveling.jpg';
import roadWorksImg from '@/assets/service-road-works.jpg';
import drillingImg from '@/assets/service-drilling.jpg';
import concreteImg from '@/assets/service-concrete.jpg';

const services = [
  {
    title: 'House Design and Construction',
    description:
      'We professionally design structures and construct. We also construct all kinds of designs presented to us. Trust us, we will transform your document/plan into that reality as planned without changing any feature or dimensions on the plan.',
    image: concreteImg,
  },
  {
    title: 'Civil Works',
    description:
      'Installing culverts for drainage, reshaping surfaces for smooth travel, and building small bridges for safe crossings — improving roads for better access and less maintenance.',
    image: roadWorksImg,
  },
  {
    title: 'Prefabricated Structures',
    description:
      'We offer professional installation of prefabricated structures, including panel buildings and steel warehouses. Our process includes site preparation, foundation laying, and quick assembly of pre-made walls, roofs, and frames. With precise factory-made components, we ensure fast, cost effective, and durable construction — perfect for warehouses, workshops, and storage facilities.',
    image: landLevelingImg,
  },
  {
    title: 'Supply of Construction Materials',
    description:
      'We provide end-to-end import solutions for prefabricated structures and materials from China, ensuring quality, compliance, and timely delivery.',
    image: drillingImg,
  },
  {
    title: 'Steel Structures Construction',
    description:
      'We build different infrastructures, for example houses or offices, foam and concrete works, and masonry works.',
    image: concreteImg,
  },
];

const Services = () => {
  return (
    <section id="services" className="pt-0 md:pt-0 pb-16 md:pb-20 bg-section-alt">
      <div className="container-wide">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
            What We Do
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer comprehensive construction solutions tailored to meet your every need, from land preparation to complete infrastructure development.
          </p>
        </div>

        <div className="space-y-8 md:space-y-12">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={service.title}
                className={`flex flex-col md:flex-row ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-6 md:gap-10`}
              >
                <div className="w-full md:w-1/2">
                  <div className="relative h-56 md:h-64 overflow-hidden rounded-lg shadow-md">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 md:hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="font-heading font-bold text-2xl text-foreground mb-3">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link to="/services" className="inline-flex items-center text-primary font-medium hover:gap-2 transition-all">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button size="lg" className="gap-2">
              View All Services <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
