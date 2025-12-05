import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Target, Eye, Users, Award, CheckCircle } from "lucide-react";
import aboutTeamImg from "@/assets/about-team.jpg";

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
  return (
    <Layout>
      <PageHeader title="About Us" />
      
      {/* Company Overview */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
                Building Excellence Since <span className="text-primary">2009</span>
              </h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Kakanga Constructions is a leading construction company in Malawi, dedicated to delivering 
                high-quality infrastructure projects that drive development and improve communities. 
                With over 15 years of experience, we have established ourselves as a trusted partner 
                for both public and private sector projects.
              </p>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our commitment to excellence, safety, and sustainability has made us the preferred 
                choice for complex construction projects across the nation. We pride ourselves on 
                our ability to deliver projects on time and within budget while maintaining the 
                highest standards of quality.
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
            <div className="relative">
              <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={aboutTeamImg} 
                  alt="Kakanga Constructions Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-bold font-heading">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#1a1a2e] text-white">
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
      <section className="section-padding bg-muted/50">
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
                To be the leading construction company in Malawi and the region, recognized for 
                excellence in infrastructure development, innovation, and sustainable practices 
                that positively impact communities and the environment.
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
                To deliver exceptional construction services that exceed client expectations through 
                innovative solutions, skilled workforce, and unwavering commitment to quality, safety, 
                and environmental responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
              Why Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Why Choose Us</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We bring together expertise, innovation, and dedication to deliver outstanding results
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">Expert Team</h3>
              <p className="text-muted-foreground">
                Our skilled professionals bring years of experience and expertise to every project
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">Quality Assurance</h3>
              <p className="text-muted-foreground">
                We maintain the highest standards of quality in all our construction projects
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-heading mb-3">On-Time Delivery</h3>
              <p className="text-muted-foreground">
                We pride ourselves on completing projects within schedule and budget
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutPage;
