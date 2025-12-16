'use client';

import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

const categories = ["All", "Residential", "Community", "Government", "Fabrication", "Prefabricated"];

const projects = [
  {
    title: "Maintenance of a Residential House",
    category: "Residential",
    client: "CCAP General Assembly",
    location: "Area 47, Sector 2",
    image: "/images/project.png",
  },
  {
    title: "Construction of Community Library",
    category: "Community",
    client: "Change Her World (NGO)",
    location: "Chilumba - Karonga District",
    image: "/images/project.png",
  },
  {
    title: "Ministry of Lands House Maintenance",
    category: "Government",
    client: "Ministry of Lands",
    location: "Mzuzu City",
    image: "/images/project.png",
  },
  {
    title: "Car Van Fabrication into Office",
    category: "Fabrication",
    client: "Katsuka Honey Production",
    location: "Blantyre City",
    image: "/images/project.png",
  },
  {
    title: "Shipping Container Fabrication",
    category: "Fabrication",
    client: "Malawi Bureau of Standards",
    location: "Songwe Boarder Post, Karonga",
    image: "/images/project.png",
  },
  {
    title: "Prefabricated Office Project",
    category: "Prefabricated",
    client: "Private Client",
    location: "Lilongwe, Malawi",
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

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-header text-white shadow-md"
                    : "bg-white text-muted-foreground hover:bg-header/10 hover:text-header"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-header text-white px-3 py-1 rounded-full text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="heading-6 mb-3">{project.title}</h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Briefcase className="w-4 h-4 mr-2 text-header" />
                      {project.client}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-2 text-header" />
                      {project.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="body-base text-muted-foreground">
                No projects found in the selected category.
              </p>
            </div>
          )}
        </div>
      </section>



      {/* Call to Action */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="bg-header rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="heading-3 text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="body-base text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us today for a free consultation and detailed quote. 
              Let's bring your construction vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="bg-white text-header hover:bg-gray-100 px-8 py-3 rounded-lg font-medium transition-colors shadow-lg">
                  Get Free Quote
                </button>
              </Link>
              <Link href="/projects">
                <button className="border border-white text-white hover:bg-white hover:text-header px-8 py-3 rounded-lg font-medium transition-colors">
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