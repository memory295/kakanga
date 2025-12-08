import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { MapPin } from "lucide-react";
import serviceLandLeveling from "@/assets/service-land-leveling.jpg";
import serviceRoadWorks from "@/assets/service-road-works.jpg";
import serviceDrilling from "@/assets/service-drilling.jpg";
import serviceConcrete from "@/assets/service-concrete.jpg";

const categories = ["All", "Roads", "Bridges", "Land Development", "Commercial"];

const projects = [
  {
    title: "M1 Road Rehabilitation",
    category: "Roads",
    location: "Lilongwe - Blantyre",
    year: "2023",
    image: serviceRoadWorks,
  },
  {
    title: "Kamuzu Bridge Extension",
    category: "Bridges",
    location: "Lilongwe",
    year: "2023",
    image: serviceConcrete,
  },
  {
    title: "Industrial Park Development",
    category: "Land Development",
    location: "Blantyre",
    year: "2022",
    image: serviceLandLeveling,
  },
  {
    title: "Shopping Mall Construction",
    category: "Commercial",
    location: "Mzuzu",
    year: "2022",
    image: serviceConcrete,
  },
  {
    title: "Township Road Network",
    category: "Roads",
    location: "Zomba",
    year: "2022",
    image: serviceRoadWorks,
  },
  {
    title: "River Crossing Bridge",
    category: "Bridges",
    location: "Mangochi",
    year: "2021",
    image: serviceDrilling,
  },
  {
    title: "Agricultural Land Preparation",
    category: "Land Development",
    location: "Kasungu",
    year: "2021",
    image: serviceLandLeveling,
  },
  {
    title: "Office Complex",
    category: "Commercial",
    location: "Lilongwe",
    year: "2021",
    image: serviceConcrete,
  },
];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <Layout>
      <PageHeader title="Our Projects" />
      
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
                className="group bg-white/30 rounded-lg border border-gray-200"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-lg bg-black/10">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full mb-3">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-bold text-xl text-[#1a1a2e] mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>{project.location}</span>
                    <span className="mx-2">•</span>
                    <span>{project.year}</span>
                  </div>
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
