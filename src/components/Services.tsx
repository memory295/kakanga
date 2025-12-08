import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import landLevelingImg from '@/assets/service-land-leveling.jpg';
import roadWorksImg from '@/assets/service-road-works.jpg';
import drillingImg from '@/assets/service-drilling.jpg';
import concreteImg from '@/assets/service-concrete.jpg';

const services = [
  {
    title: 'Land Leveling',
    description: 'With years of experience in the construction industry, our company has established a solid reputation for providing exceptional land leveling services.',
    image: landLevelingImg,
  },
  {
    title: 'Road Works',
    description: 'At our construction company, we take pride in our expertise and experience in road construction. We have successfully executed numerous road projects.',
    image: roadWorksImg,
  },
  {
    title: 'Drilling and Excavation',
    description: 'With a wealth of experience in the construction industry, our company excels in various drilling works and excavation projects.',
    image: drillingImg,
  },
  {
    title: 'Concrete Works',
    description: 'As a reputable construction company, we have amassed extensive experience in executing various concrete works projects with precision.',
    image: concreteImg,
  },
];

const Services = () => {
  return (
    <section id="services" className="section-padding bg-background">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="group bg-card rounded-lg overflow-hidden shadow-md card-hover"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <h3 className="font-heading font-bold text-lg text-foreground mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <Link to="/services" className="inline-flex items-center text-primary font-medium text-sm hover:gap-2 transition-all">
                  Learn More <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          ))}
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