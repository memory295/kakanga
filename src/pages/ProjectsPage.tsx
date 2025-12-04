import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { MapPin } from "lucide-react";

const categories = ["All", "Roads", "Bridges", "Land Development", "Commercial"];

const projects = [
  {
    title: "M1 Road Rehabilitation",
    category: "Roads",
    location: "Lilongwe - Blantyre",
    year: "2023",
    image: "/placeholder.svg",
  },
  {
    title: "Kamuzu Bridge Extension",
    category: "Bridges",
    location: "Lilongwe",
    year: "2023",
    image: "/placeholder.svg",
  },
  {
    title: "Industrial Park Development",
    category: "Land Development",
    location: "Blantyre",
    year: "2022",
    image: "/placeholder.svg",
  },
  {
    title: "Shopping Mall Construction",
    category: "Commercial",
    location: "Mzuzu",
    year: "2022",
    image: "/placeholder.svg",
  },
  {
    title: "Township Road Network",
    category: "Roads",
    location: "Zomba",
    year: "2022",
    image: "/placeholder.svg",
  },
  {
    title: "River Crossing Bridge",
    category: "Bridges",
    location: "Mangochi",
    year: "2021",
    image: "/placeholder.svg",
  },
  {
    title: "Agricultural Land Preparation",
    category: "Land Development",
    location: "Kasungu",
    year: "2021",
    image: "/placeholder.svg",
  },
  {
    title: "Office Complex",
    category: "Commercial",
    location: "Lilongwe",
    year: "2021",
    image: "/placeholder.svg",
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
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Featured <span className="text-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our portfolio of successful construction projects across Malawi
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
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
                className="group bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden">
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
                  <h3 className="text-xl font-bold font-heading mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
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
