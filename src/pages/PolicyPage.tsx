import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Shield, Leaf, Heart, Users, HardHat, FileCheck } from "lucide-react";

const policies = [
  {
    icon: HardHat,
    title: "Health & Safety Policy",
    description: "We are committed to providing a safe and healthy working environment for all employees, contractors, and visitors. Our comprehensive safety management system ensures that all work is carried out in compliance with national and international safety standards.",
    points: [
      "Regular safety training for all personnel",
      "Strict PPE requirements on all sites",
      "Daily safety briefings and inspections",
      "Incident reporting and investigation procedures",
    ],
  },
  {
    icon: Leaf,
    title: "Environmental Policy",
    description: "Hema Construction is dedicated to minimizing our environmental impact and promoting sustainable construction practices. We continuously seek ways to reduce waste, conserve resources, and protect natural ecosystems.",
    points: [
      "Waste management and recycling programs",
      "Dust and noise control measures",
      "Protection of water resources",
      "Rehabilitation of disturbed areas",
    ],
  },
  {
    icon: Shield,
    title: "Quality Policy",
    description: "Quality is at the heart of everything we do. We maintain rigorous quality control processes to ensure that all our projects meet or exceed client expectations and industry standards.",
    points: [
      "ISO-aligned quality management system",
      "Regular quality audits and inspections",
      "Material testing and certification",
      "Continuous improvement initiatives",
    ],
  },
  {
    icon: Heart,
    title: "Corporate Social Responsibility",
    description: "We believe in giving back to the communities where we work. Our CSR initiatives focus on education, health, and community development to create lasting positive impact.",
    points: [
      "Community engagement programs",
      "Local employment opportunities",
      "Support for education initiatives",
      "Infrastructure development for communities",
    ],
  },
  {
    icon: Users,
    title: "Equal Opportunity Policy",
    description: "Hema Construction is an equal opportunity employer. We value diversity and are committed to creating an inclusive environment where all employees can thrive regardless of their background.",
    points: [
      "Non-discriminatory hiring practices",
      "Equal pay for equal work",
      "Career development opportunities",
      "Harassment-free workplace",
    ],
  },
  {
    icon: FileCheck,
    title: "Compliance Policy",
    description: "We operate with integrity and in full compliance with all applicable laws, regulations, and ethical standards. Our compliance program ensures transparency and accountability in all our operations.",
    points: [
      "Anti-corruption measures",
      "Regulatory compliance monitoring",
      "Ethical business practices",
      "Transparent reporting",
    ],
  },
];

const PolicyPage = () => {
  return (
    <Layout>
      <PageHeader title="Our Policies" />
      
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
              Our Standards
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Our <span className="text-primary">Commitment</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We uphold the highest standards of safety, quality, and ethical conduct 
              in all our operations
            </p>
          </div>

          <div className="space-y-8">
            {policies.map((policy, index) => (
              <div 
                key={index}
                className="bg-card rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <policy.icon className="w-8 h-8 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold font-heading mb-4">
                      {policy.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {policy.description}
                    </p>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {policy.points.map((point, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          <span className="text-sm">{point}</span>
                        </li>
                      ))}
                    </ul>
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

export default PolicyPage;
