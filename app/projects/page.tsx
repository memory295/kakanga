'use client';

import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { MapPin, Briefcase } from "lucide-react";
import Link from "next/link";
import { useInView } from "@/hooks/use-in-view";

// Animation component for projects grid
const AnimatedProjectsGrid = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({ threshold: 0.1, once: false });
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      {children}
    </div>
  );
};

// Animation component for filter buttons
const AnimatedFilters = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({ threshold: 0.1, once: false });
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-500 ease-out delay-100 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      {children}
    </div>
  );
};

// Animation component for header section
const AnimatedHeader = ({ children }: { children: React.ReactNode }) => {
  const { ref, inView } = useInView({ threshold: 0.1, once: false });
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-600 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  );
};

const categories = ["All", "Construction", "Fabrication", "Rehabilitation", "Installation"];

const projects = [
  {
    title: "Construction of Secondary School Hall",
    category: "Construction",
    client: "Karonga CDSS",
    referenceNumber: "",
    location: "Karonga Town",
    image: "/images/project.png",
  },
  {
    title: "Design and Fabrication of 2×40ft Containers into Warehouse",
    category: "Fabrication",
    client: "Banja Lamsogolo, Box 1854, Lilongwe, Malawi",
    referenceNumber: "PO-BLM-00773 & PO-BLM-00994",
    location: "Banja House, Head Office, Along Paul Kagame Road, Lilongwe",
    image: "/images/project.png",
  },
  {
    title: "Residential House Maintenance/Rehabilitation",
    category: "Rehabilitation",
    client: "CCAP General Assembly, P.O. Box 30398, Capital City, Lilongwe 3",
    referenceNumber: "House Rehabilitation Plot No:47/2/134",
    location: "Area 47 Sector 2, Lilongwe",
    image: "/images/project.png",
  },
  {
    title: "Residential House Maintenance/Rehabilitation (Mzuzu)",
    category: "Rehabilitation",
    client: "Ministry of Lands Private Bag 311, Capital City, Lilongwe 3, Malawi",
    referenceNumber: "130/L/PH/MZ/120",
    location: "Chimalilo Area in Mzuzu City",
    image: "/images/project.png",
  },
  {
    title: "Installation of Prefabricated Structure and Security Fence",
    category: "Installation",
    client: "Department of Disaster Management Affairs (DoDMA)",
    referenceNumber: "090/IPDC/DoDMA/2023-24/009",
    location: "Karonga District Council and Salima District Council",
    image: "/images/project.png",
  },
  {
    title: "Container Offices Re-location",
    category: "Installation",
    client: "Malawi Bureau of Standards P.O Box 946, Blantyre",
    referenceNumber: "MBS-SONGWE-RELOC/09/2024",
    location: "Songwe Border Post, Karonga",
    image: "/images/project.png",
  },
  {
    title: "Supply Fabrication of Car Van into Office",
    category: "Fabrication",
    client: "Katsuka Investments - Blantyre",
    referenceNumber: "",
    location: "Nancholi, Blantyre",
    image: "/images/project.png",
  },
  {
    title: "Supply and Fabrication of Shipping Container into Office",
    category: "Fabrication",
    client: "Malawi Bureau of Standards P.O Box 946, Blantyre",
    referenceNumber: "LPO 027044 and LPO 027258",
    location: "Songwe Border Post, Karonga",
    image: "/images/project.png",
  },
  {
    title: "Construction of Community Library",
    category: "Construction",
    client: "Change Her World (NGO)",
    referenceNumber: "",
    location: "Uliwa, Chilumba in Karonga",
    image: "/images/project.png",
  },
];

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <Layout>
      <PageHeader 
        title="Our Projects" 
      />
      
      {/* Project Filter */}
      <section className="section-padding bg-section-alt">
        <div className="container-wide">
          <AnimatedHeader>
            <div className="text-center mb-8">
              <span className="text-header font-semibold text-sm uppercase tracking-wider mb-2 block">
                Our Portfolio
              </span>
              <h2 className="heading-3 mb-4">
                Projects That Showcase Our Excellence
              </h2>
              <p className="body-base max-w-3xl mx-auto">
                Explore our diverse portfolio of completed projects, from residential 
              constructions to large-scale community developments.
            </p>
          </div>
          </AnimatedHeader>

          {/* Category Filter */}
          <AnimatedFilters>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-white text-muted-foreground hover:bg-primary/10 hover:text-primary shadow-sm"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimatedFilters>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <AnimatedProjectsGrid>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-lg shadow-sm hover:shadow-lg overflow-hidden transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-header text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                
                <div className="p-6">
                  <h3 className="heading-6 mb-3">{project.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start text-sm text-muted-foreground">
                      <Briefcase className="w-4 h-4 mr-2 text-header mt-0.5 flex-shrink-0" />
                      <span>{project.client}</span>
                    </div>
                    
                    {project.referenceNumber && (
                      <div className="flex items-start text-sm text-muted-foreground">
                        <span className="w-4 h-4 mr-2 text-header text-xs font-bold mt-0.5 flex-shrink-0">#</span>
                        <span>{project.referenceNumber}</span>
                      </div>
                    )}
                    
                    <div className="flex items-start text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-header mt-0.5 flex-shrink-0" />
                      <span>{project.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </AnimatedProjectsGrid>

          {filteredProjects.length === 0 && (
            <AnimatedProjectsGrid>
              <div className="text-center py-12">
                <p className="body-base text-muted-foreground">
                  No projects found in the selected category.
                </p>
              </div>
            </AnimatedProjectsGrid>
          )}
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
                <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-lg font-medium transition-colors shadow-lg">
                  Get Free Quote
                </button>
              </Link>
              <Link href="/projects">
                <button className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 rounded-lg font-medium transition-colors">
                  View Our Work
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}