import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Target, Eye, Users, Award, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import aboutTeamImg from "@/assets/about-team.jpg";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

const stats = [
  { number: "15+", label: "Years Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "50+", label: "Expert Team" },
  { number: "100%", label: "Client Satisfaction" },
];

const expertise = [
  "Road Construction & Rehabilitation",
  "Land Leveling & Grading",
  "Drilling & Blasting Operations",
  "Concrete Works & Structures",
  "Earthworks & Excavation",
  "Bridge Construction",
];

const AboutPage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location]);

  return (
    <Layout>
      <PageHeader title="Who We Are" backgroundImage={aboutTeamImg} />
      
      
      {/* Company Overview */}
      <section id="who-we-are" className="section-padding scroll-mt-24">
        <div className="container-wide">
          <div className="flex items-start gap-6">
            {/* Left blue pillar */}
            <div className="w-6 bg-primary rounded-full h-[36vh] md:h-[40vh]" aria-hidden="true" />
            {/* Text content inset */}
            <div className="flex-1 pl-2 md:pl-3">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 uppercase">
                Quality is Our Mission Since <span className="text-primary">2011</span>
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Kakanga Construction is a leading Malawian construction company known for excellence in building design, civil engineering, and prefabricated structures. We turn visions into reality through innovative, reliable solutions that meet international standards.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                We deliver residential homes, commercial developments, industrial warehouses, and public infrastructure. Our quality craftsmanship and exceptional client service make us a trusted partner in Malawi’s fast‑growing construction industry.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                What sets us apart is our focus on modern building techniques and sustainable practices. We specialize in prefabricated structures—offering faster, more cost‑effective, and environmentally friendly construction without compromising durability. By integrating advanced materials and smart engineering, every project is built to withstand time and conditions.
              </p>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                From custom‑designed homes and steel warehouses to government infrastructure, we apply the same level of precision, innovation, and professionalism across all our work.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our skilled team of engineers, architects, and builders upholds our standards of excellence through continuous training and strict adherence to safety regulations. A collaborative approach ensures efficient execution, maintaining both quality and budget discipline.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {expertise.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section id="our-team" className="section-padding bg-section-alt scroll-mt-24">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">Our Team</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Meet the Leadership</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Experienced professionals leading projects with integrity and excellence.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              { name: 'STEVEN KABAGHE', role: 'Managing Director', photo: '/images/team/steven.jpg' },
              { name: 'KONDWANI MWAFULIWA', role: 'Marketing Manager', photo: '/images/team/kondwani.jpg' },
              { name: 'ARTHUR MWAMBILA', role: 'Architecture', photo: '/images/team/arthur.jpg' },
              { name: 'CAROLINE MITHI', role: 'Land Surveyor', photo: '/images/team/caroline.jpg' },
              { name: 'INNOCENT MAPSYERE', role: 'Site Agent', photo: '/images/team/innocent.jpg' },
            ].map((m) => (
              <div key={m.name} className="bg-card rounded-lg shadow-sm overflow-hidden">
                <div className="p-3">
                  <div className="rounded-xl border-2 border-primary/20 bg-secondary/60 p-2 shadow-sm relative">
                    <span className="absolute -top-1 -left-1 w-6 h-6 rounded-tr-xl bg-primary/60" aria-hidden="true" />
                    <div className="relative h-40 md:h-48 rounded-md overflow-hidden bg-white shadow">
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-full h-full object-cover transition-transform duration-500"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                      <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 bg-gradient-to-t from-black/20 to-transparent transition-opacity duration-300" />
                      <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-semibold px-2 py-1 rounded">
                        Team
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-heading font-semibold text-base text-foreground leading-tight">{m.name}</h3>
                  <p className="text-muted-foreground text-xs">{m.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="team" className="py-16 bg-[#1a1a2e] text-white">
        <div className="container-wide px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold font-heading text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision-mission" className="section-padding bg-muted/50 scroll-mt-24">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-card p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold font-heading">Our Vision</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To grow and become a successful bigger company that can work even International, whereby so doing creating job opportunities for the non working people, helping the Government to develop our country and improve lives of our Employees.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-card p-8 rounded-lg shadow-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-accent" />
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

      {/* Why Choose Us - Core Values style layout with slideshow */}
      <section id="why-us" className="section-padding bg-white scroll-mt-24">
        <div className="container-wide">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">Why Us</span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-[#1a1a2e]">Why Choose Us</h2>
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
                <aside className="rounded-lg p-4 md:p-5 bg-gradient-to-b from-gray-200 to-gray-100 text-[#1a1a2e] mt-4 md:mt-6">
                  <nav className="space-y-2">
                    {items.map((it, idx) => (
                      <button
                        key={it.title}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                          idx === activeIndex ? "bg-white shadow-sm text-primary" : "hover:bg-white/70"
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
                    <active.icon className="w-6 h-6 text-primary" />
                    <h3 className="font-heading font-bold text-xl text-[#1a1a2e]">{active.title}</h3>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed max-w-md ml-2">{active.description}</p>
                  <a href="#projects" className="mt-4 ml-2 inline-flex items-center text-primary font-medium hover:underline">
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
                          <span key={i} className={`h-1 w-6 rounded-full ${i === activeIndex ? "bg-primary" : "bg-white/40"}`} />
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
    </Layout>
  );
};

export default AboutPage;
