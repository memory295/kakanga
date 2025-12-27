'use client';

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Target, Eye, Users, Award, CheckCircle, ChevronLeft, ChevronRight, Linkedin, Play, Pause } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const expertise = [
  "Road Construction & Rehabilitation",
  "Land Leveling & Grading",

  "Concrete Works & Structures",
  "Earthworks & Excavation",
  "Bridge Construction",
];

export default function AboutPage() {
  useEffect(() => {
    // Handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    // Check for hash on initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>About Us - Our Story, Mission & Values | Kakanga Constructions</title>
        <meta name="description" content="Learn about Kakanga Constructions, Malawi's leading construction company since 2011. Discover our mission, vision, values, and experienced leadership team committed to building quality infrastructure." />
        <meta name="keywords" content="about kakanga constructions, malawi construction company, our mission, our vision, construction team, company history, building contractors malawi" />
      </Head>
      <Layout>
        <PageHeader title="Who We Are" />
      
      {/* Company Overview */}
      <section id="who-we-are" className="section-padding scroll-mt-24">
        <div className="container-wide">
          {/* Header */}
          <div className="text-center mb-12">
            <span className="text-header font-semibold text-sm uppercase tracking-wider mb-2 block">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              Quality is Our Mission Since <span className="text-header">2011</span>
            </h2>
            <div className="w-20 h-1 bg-header mx-auto mb-8"></div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Kakanga Construction is a leading Malawian construction company known for excellence in building design, civil engineering, and prefabricated structures. We turn visions into reality through innovative, reliable solutions that meet international standards.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We deliver residential homes, commercial developments, industrial warehouses, and public infrastructure. Our quality craftsmanship and exceptional client service make us a trusted partner in Malawi's fast‑growing construction industry.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                What sets us apart is our focus on modern building techniques and sustainable practices. We specialize in prefabricated structures—offering faster, more cost‑effective, and environmentally friendly construction without compromising durability.
              </p>
            </div>
            
            {/* Video Section with Overlay */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg group">
              <InteractiveVideo />
            </div>
          </div>

          {/* Expertise Section */}
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-bold font-heading text-center mb-8">Our Expertise</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {expertise.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-lg hover:bg-header/10 transition-colors">
                  <div className="w-10 h-10 bg-header/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-header" />
                  </div>
                  <span className="font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Core Values style layout with slideshow */}
      <section id="why-us" className="section-padding bg-white scroll-mt-24">
        <div className="container-wide">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-header font-semibold text-sm uppercase tracking-wider mb-2 block">Why Us</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">Why Choose Us</h2>
          </div>

          {(() => {
            const items = [
              {
                title: "Expert Team",
                description: "Our skilled professionals bring years of experience and expertise to every project.",
                icon: Users,
                image: "/images/why-us/expert.jpg",
              },
              {
                title: "Quality Assurance",
                description: "We maintain the highest standards of quality in all our construction projects.",
                icon: Award,
                image: "/images/why-us/quality.jpg",
              },
              {
                title: "On-Time Delivery",
                description: "We pride ourselves on completing projects within schedule and budget.",
                icon: Target,
                image: "/images/why-us/ontime.jpg",
              },
            ];

            const [activeIndex, setActiveIndex] = useState(0);

            useEffect(() => {
              const id = setInterval(() => setActiveIndex((i) => (i + 1) % items.length), 6000);
              return () => clearInterval(id);
            }, []);

            const onPrev = () => setActiveIndex((i) => (i - 1 + items.length) % items.length);
            const onNext = () => setActiveIndex((i) => (i + 1) % items.length);
            const active = items[activeIndex];

            return (
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_560px] items-start gap-6">
                {/* Left nav (fade grey) */}
                <aside className="rounded-lg p-4 md:p-5 bg-gradient-to-b from-gray-200 to-gray-100 text-foreground mt-4 md:mt-6">
                  <nav className="space-y-2">
                    {items.map((it, idx) => (
                      <button
                        key={it.title}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          idx === activeIndex ? "bg-white shadow-sm text-header" : "hover:bg-white/70"
                        }`}
                      >
                        <it.icon className="w-4 h-4" />
                        {it.title}
                      </button>
                    ))}
                  </nav>
                </aside>

                {/* Middle text */}
                <div className="flex flex-col items-start justify-center text-left px-4 pr-6 md:pr-10 mt-4 md:mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <active.icon className="w-6 h-6 text-header" />
                    <h3 className="font-heading font-bold text-xl text-foreground">{active.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed max-w-md ml-2">{active.description}</p>
                  <a href="#projects" className="mt-4 ml-2 inline-flex items-center text-header font-medium hover:underline">
                    Learn more
                    <svg className="w-4 h-4 ml-2 animate-bounce" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </a>
                </div>

                {/* Right slideshow style image */}
                <div className="rounded-lg border border-gray-200 bg-white overflow-hidden mx-auto w-full max-w-[560px]">
                  <div className="relative h-64 bg-black/10">
                    <img
                      src={active.image}
                      alt={active.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                    {/* Controls and indicators */}
                    <div className="absolute inset-x-0 bottom-3 flex items-center justify-between px-3">
                      <button aria-label="Previous" onClick={onPrev} className="rounded-full bg-black/40 hover:bg-black/60 text-white p-2">
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <div className="flex gap-1">
                        {items.map((_, i) => (
                          <span key={i} className={`h-1 w-6 rounded-full ${i === activeIndex ? "bg-header" : "bg-white/40"}`} />
                        ))}
                      </div>
                      <button aria-label="Next" onClick={onNext} className="rounded-full bg-black/40 hover:bg-black/60 text-white p-2">
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision-mission" className="section-padding bg-muted/50 scroll-mt-24">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-card/40 p-8 rounded-lg border border-gray-200/60 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-header/8 rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-header/80" />
                </div>
                <h3 className="text-2xl font-bold font-heading">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To grow and become a successful bigger company that can work even International, whereby so doing creating job opportunities for the non working people, helping the Government to develop our country and improve lives of our Employees.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-card/40 p-8 rounded-lg border border-gray-200/60 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-accent/8 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-accent/80" />
                </div>
                <h3 className="text-2xl font-bold font-heading">Our Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                A quality products, satisfactory services, accountability and Safety is our mission.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section id="our-team" className="section-padding bg-section-alt scroll-mt-24">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-header font-semibold text-sm uppercase tracking-wider mb-2 block">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Meet the Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Experienced professionals leading projects with integrity and excellence.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'STEVEN KABAGHE', role: 'Managing Director', photo: '/images/team/steven.jpg' },
              { name: 'KONDWANI MWAFULIWA', role: 'Marketing Manager', photo: '/images/team/kondwani.jpg' },
              { name: 'ARTHUR MWAMBILA', role: 'Architecture', photo: '/images/team/arthur.jpg' },
              { name: 'CAROLINE MITHI', role: 'Land Surveyor', photo: '/images/team/caroline.jpg' },
              { name: 'INNOCENT MAPSYERE', role: 'Site Agent', photo: '/images/team/innocent.jpg' },
            ].map((m) => {
              return (
                <div key={m.name} className="group rounded-2xl overflow-hidden border border-gray-100 bg-card shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative">
                    <AspectRatio ratio={4/3}>
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                    </AspectRatio>
                    <div className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/80 backdrop-blur px-2 py-0.5 text-[10px] font-semibold text-header border border-white/70">
                      Team
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-heading font-semibold text-base md:text-lg text-foreground line-clamp-1">{m.name}</h3>
                        <p className="text-muted-foreground text-sm">{m.role}</p>
                      </div>
                      <a
                        href="#"
                        aria-label="LinkedIn"
                        className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 text-muted-foreground hover:text-header hover:border-header transition-colors flex-shrink-0"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
    </>
  );
}

// Interactive Video Component
const InteractiveVideo = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const togglePlayPause = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Only toggle overlay visibility, keep video playing
    setShowOverlay(!showOverlay);
  };

  return (
    <div className="relative cursor-pointer" onClick={handleVideoClick}>
      <video 
        ref={setVideoRef}
        className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/house1.jpg"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/construction.mp4" type="video/mp4" />
        <source src="/construction-2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Video Overlays - Toggle visibility */}
      <div 
        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-500 pointer-events-none ${
          showOverlay ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
      <div 
        className={`absolute inset-0 bg-header/20 mix-blend-multiply transition-opacity duration-500 pointer-events-none ${
          showOverlay ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
      
      {/* Overlay Content - Toggle visibility */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-none transition-all duration-500 ${
          showOverlay ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 border border-white/20">
          <h3 className="text-xl font-bold font-heading mb-3 text-white">Our Commitment</h3>
          <p className="text-white/90 leading-relaxed mb-4 text-sm">
            From custom‑designed homes and steel warehouses to government infrastructure, we apply the same level of precision, innovation, and professionalism across all our work.
          </p>
          <p className="text-white/80 leading-relaxed text-sm">
            Our skilled team of engineers, architects, and builders upholds our standards of excellence through continuous training and strict adherence to safety regulations.
          </p>
        </div>
      </div>

      {/* Play/Pause Control Overlay */}
      <div 
        className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/10"
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering overlay toggle
          togglePlayPause();
        }}
      >
        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 shadow-lg transform hover:scale-110 transition-transform duration-200">
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white ml-1" />
          )}
        </div>
      </div>

      {/* Small Play/Pause Indicator with overlay state */}
      <div className="absolute top-4 right-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
          {isPlaying ? (
            <Pause className="w-3 h-3 text-white" />
          ) : (
            <Play className="w-3 h-3 text-white ml-0.5" />
          )}
        </div>
      </div>

      {/* Overlay Toggle Indicator */}
      <div className="absolute top-4 left-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${showOverlay ? 'bg-white' : 'bg-white/40'}`}></div>
        </div>
      </div>
    </div>
  );
};