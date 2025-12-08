import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { MapPin, Briefcase } from "lucide-react";
import serviceLandLeveling from "@/assets/service-land-leveling.jpg";
import serviceRoadWorks from "@/assets/service-road-works.jpg";
import serviceDrilling from "@/assets/service-drilling.jpg";
import serviceConcrete from "@/assets/service-concrete.jpg";

const categories = ["All", "Residential", "Community", "Government", "Fabrication", "Prefabricated"];

const projects = [
  {
    title: "Maintenance of a Residential House",
    category: "Residential",
    client: "CCAP General Assembly",
    location: "Area 47, Sector 2",
    image: serviceConcrete,
  },
  {
    title: "Construction of Community Library",
    category: "Community",
    client: "Change Her World (NGO)",
    location: "Chilumba - Karonga District",
    image: serviceConcrete,
  },
  {
    title: "Ministry of Lands House Maintenance",
    category: "Government",
    client: "Ministry of Lands",
    location: "Mzuzu City",
    image: serviceConcrete,
  },
  {
    title: "Car Van Fabrication into Office",
    category: "Fabrication",
    client: "Katsuka Honey Production",
    location: "Blantyre City",
    image: serviceDrilling,
  },
  {
    title: "Shipping Container Fabrication",
    category: "Fabrication",
    client: "Malawi Bureau of Standards",
    location: "Songwe Boarder Post, Karonga",
    image: serviceDrilling,
  },
  {
    title: "Prefabricated Office Project",
    category: "Prefabricated",
    client: "DODMA",
    location: "Karonga and Salima Districts",
    image: serviceLandLeveling,
  },
];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <Layout>
      <PageHeader title="Our Projects" backgroundImage="/images/project.png" />
      
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
              Our Portfolio
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#1a1a2e] mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed max-w-2xl mx-auto">
              Explore our portfolio of successful construction projects across Malawi
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? "bg-white shadow-sm text-primary"
                    : "bg-gradient-to-b from-gray-200 to-gray-100 text-[#1a1a2e] hover:bg-white/70"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div 
                key={index}
                className="group rounded-lg border border-gray-200 bg-white overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-black/10">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#1a1a2e] mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-700 text-sm mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                  </div>
                  {"client" in project && (
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                      <Briefcase className="w-4 h-4" />
                      <span>{(project as any).client}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectsPage;
