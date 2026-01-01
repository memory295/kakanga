'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const categories = ['All', 'Construction', 'Fabrication', 'Rehabilitation', 'Installation'];

const projects = [
  {
    title: 'Construction of Secondary School Hall',
    category: 'Construction',
    client: 'Karonga CDSS',
    referenceNumber: '',
    location: 'Karonga Town',
    image: "/images/house1.jpg",
  },
  {
    title: 'Design and Fabrication of 2×40ft Containers into Warehouse',
    category: 'Fabrication',
    client: 'Banja Lamsogolo, Box 1854, Lilongwe, Malawi',
    referenceNumber: 'PO-BLM-00773 & PO-BLM-00994',
    location: 'Banja House, Head Office, Along Paul Kagame Road, Lilongwe',
    image: "/images/van.jpg",
  },
  {
    title: 'Residential House Maintenance/Rehabilitation',
    category: 'Rehabilitation',
    client: 'CCAP General Assembly, P.O. Box 30398, Capital City, Lilongwe 3',
    referenceNumber: 'House Rehabilitation Plot No:47/2/134',
    location: 'Area 47 Sector 2, Lilongwe',
    image: "/images/rehab.jpg",
  },
  {
    title: 'Residential House Maintenance/Rehabilitation (Mzuzu)',
    category: 'Rehabilitation',
    client: 'Ministry of Lands Private Bag 311, Capital City, Lilongwe 3, Malawi',
    referenceNumber: '130/L/PH/MZ/120',
    location: 'Chimalilo Area in Mzuzu City',
    image: "/images/house2.jpg",
  },
  {
    title: 'Installation of Prefabricated Structure and Security Fence',
    category: 'Installation',
    client: 'Department of Disaster Management Affairs (DoDMA)',
    referenceNumber: '090/IPDC/DoDMA/2023-24/009',
    location: 'Karonga District Council and Salima District Council',
    image: "/images/image2.jpg",
  },
  {
    title: 'Container Offices Re-location',
    category: 'Installation',
    client: 'Malawi Bureau of Standards P.O Box 946, Blantyre',
    referenceNumber: 'MBS-SONGWE-RELOC/09/2024',
    location: 'Songwe Border Post, Karonga',
    image: "/images/IMG_20221019_173829.jpg",
  },
  {
    title: 'Supply Fabrication of Car Van into Office',
    category: 'Fabrication',
    client: 'Katsuka Investments - Blantyre',
    referenceNumber: '',
    location: 'Nancholi, Blantyre',
    image: '/images/IMG_20221019_173847.jpg',
  },
  {
    title: 'Supply and Fabrication of Shipping Container into Office',
    category: 'Fabrication',
    client: 'Malawi Bureau of Standards P.O Box 946, Blantyre',
    referenceNumber: 'LPO 027044 and LPO 027258',
    location: 'Songwe Border Post, Karonga',
    image: '/images/IMG_20240713_203357_822.jpg',
  },
  {
    title: 'Construction of Community Library',
    category: 'Construction',
    client: 'Change Her World (NGO)',
    referenceNumber: '',
    location: 'Uliwa, Chilumba in Karonga',
    image: '/images/IMG_20240713_203404_727.jpg',
  },
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-section-alt">
      <div className="container-wide">
        <div className="text-center mb-12">
          <span className="text-header font-semibold text-sm uppercase tracking-wider mb-2 block">
            Our Portfolio
          </span>
          <h2 className="heading-3 text-foreground mb-4">
            Explore a selection of our remarkable projects
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              size="sm"
              className={`min-w-[100px]`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.title}
              className="group relative overflow-hidden rounded-lg border border-gray-100 bg-white"
            >
              <div className="relative h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-2 py-1 bg-header text-header-foreground text-xs font-medium rounded-full mb-2">
                    {project.category}
                  </span>
                  <h3 className="font-heading font-semibold text-sm text-primary-foreground leading-tight">
                    {project.title}
                  </h3>
                </div>
              </div>
              
              {/* Project Details */}
              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-1">Client</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{project.client}</p>
                </div>
                
                {project.referenceNumber && (
                  <div>
                    <h4 className="font-semibold text-sm text-foreground mb-1">Reference</h4>
                    <p className="text-xs text-muted-foreground">{project.referenceNumber}</p>
                  </div>
                )}
                
                <div>
                  <h4 className="font-semibold text-sm text-foreground mb-1">Location</h4>
                  <p className="text-xs text-muted-foreground">{project.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/projects">
            <Button size="lg" className="gap-2">
              View All Projects <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Projects;
