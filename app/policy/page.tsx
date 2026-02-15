import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Shield, Users, Leaf, Award } from "lucide-react";

const policies = [
  {
    icon: Shield,
    title: "Safety Policy",
    description: "Ensuring the safety of our workers, clients, and communities in all our operations.",
    points: [
      "Zero-accident workplace commitment",
      "Regular safety training and certifications",
      "Use of proper protective equipment",
      "Safety-first approach in all projects"
    ]
  },
  {
    icon: Users,
    title: "Quality Assurance",
    description: "Maintaining the highest standards in all our construction and engineering services.",
    points: [
      "ISO-compliant quality management",
      "Regular project inspections",
      "Client satisfaction guarantee",
      "Continuous improvement processes"
    ]
  },
  {
    icon: Leaf,
    title: "Environmental Policy",
    description: "Committed to sustainable construction practices and environmental protection.",
    points: [
      "Sustainable material sourcing",
      "Waste reduction and recycling",
      "Environmental impact assessments",
      "Green building practices"
    ]
  },
  {
    icon: Award,
    title: "Ethics & Integrity",
    description: "Upholding the highest ethical standards in all our business dealings.",
    points: [
      "Transparent business practices",
      "Fair employment policies",
      "Anti-corruption measures",
      "Community responsibility"
    ]
  }
];

export default function PolicyPage() {
  return (
    <Layout>
      <PageHeader title="Our Policies" />
      
      {/* Introduction */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="caption text-header mb-2 block">
              Our Commitment
            </span>
            <h2 className="heading-4 mb-4">
              Policies That Guide Our Operations
            </h2>
            <p className="body-base max-w-3xl mx-auto">
              At Kakanga Enterprises, we are committed to maintaining the highest 
              standards in safety, quality, environmental responsibility, and ethical conduct.
            </p>
          </div>
        </div>
      </section>

      {/* Policies Grid */}
      <section className="section-padding bg-section-alt">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-8">
            {policies.map((policy, index) => {
              const IconComponent = policy.icon;
              return (
                <div key={index} className="bg-white rounded-lg p-8 shadow-sm">
                  <div className="w-16 h-16 bg-header/10 rounded-full flex items-center justify-center mb-6">
                    <IconComponent className="h-8 w-8 text-header" />
                  </div>
                  
                  <h3 className="heading-4 mb-4">{policy.title}</h3>
                  <p className="body-base mb-6">{policy.description}</p>
                  
                  <ul className="space-y-3">
                    {policy.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-header rounded-full mt-2 flex-shrink-0"></div>
                        <span className="body-small text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="heading-3 mb-4">Certifications & Compliance</h2>
            <p className="body-base max-w-2xl mx-auto">
              We maintain all necessary certifications and comply with industry 
              standards and regulations.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <Award className="h-12 w-12 text-header mx-auto mb-4" />
              <h4 className="heading-6 mb-2">ISO Certification</h4>
              <p className="body-small">Quality management system certification</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <Shield className="h-12 w-12 text-header mx-auto mb-4" />
              <h4 className="heading-6 mb-2">Safety Compliance</h4>
              <p className="body-small">Adherence to national safety standards</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <Leaf className="h-12 w-12 text-header mx-auto mb-4" />
              <h4 className="heading-6 mb-2">Environmental Standards</h4>
              <p className="body-small">Environmental management certification</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Policy Questions */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="text-center">
            <h2 className="heading-3 mb-4">
              Questions About Our Policies?
            </h2>
            <p className="body-base text-muted-foreground mb-8 max-w-2xl mx-auto">
              If you have any questions about our policies or would like more 
              detailed information, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Contact Us
              </a>
              <a 
                href="mailto:ckakanga@gmail.com"
                className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}