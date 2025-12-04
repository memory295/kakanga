import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";

const vacancies = [
  {
    title: "Civil Engineer",
    location: "Lilongwe",
    type: "Full-time",
    department: "Engineering",
    description: "We are looking for an experienced Civil Engineer to join our team and oversee construction projects from conception to completion.",
    requirements: [
      "Bachelor's degree in Civil Engineering",
      "5+ years experience in construction",
      "Professional registration preferred",
      "Strong project management skills",
    ],
  },
  {
    title: "Site Supervisor",
    location: "Blantyre",
    type: "Full-time",
    department: "Operations",
    description: "Seeking a skilled Site Supervisor to manage daily construction activities and ensure project milestones are met safely and efficiently.",
    requirements: [
      "Diploma in Construction or related field",
      "3+ years supervisory experience",
      "Knowledge of safety regulations",
      "Strong leadership abilities",
    ],
  },
  {
    title: "Heavy Equipment Operator",
    location: "Various Locations",
    type: "Full-time",
    department: "Operations",
    description: "Experienced heavy equipment operators needed for excavators, graders, and bulldozers across multiple project sites.",
    requirements: [
      "Valid heavy equipment license",
      "3+ years operating experience",
      "Good safety record",
      "Willingness to travel",
    ],
  },
  {
    title: "Quantity Surveyor",
    location: "Lilongwe",
    type: "Full-time",
    department: "Finance",
    description: "Looking for a detail-oriented Quantity Surveyor to manage project costs and prepare accurate bills of quantities.",
    requirements: [
      "Degree in Quantity Surveying",
      "Professional certification",
      "Experience with construction software",
      "Strong analytical skills",
    ],
  },
];

const VacanciesPage = () => {
  return (
    <Layout>
      <PageHeader title="Vacancies" />
      
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Join Our <span className="text-primary">Team</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Build your career with Malawi's leading construction company. 
              We offer competitive packages and growth opportunities.
            </p>
          </div>

          {vacancies.length > 0 ? (
            <div className="space-y-6">
              {vacancies.map((vacancy, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-lg p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow border border-border"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold font-heading mb-3">
                        {vacancy.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {vacancy.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {vacancy.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {vacancy.department}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {vacancy.description}
                      </p>
                      <div>
                        <h4 className="font-semibold mb-2">Requirements:</h4>
                        <ul className="grid md:grid-cols-2 gap-2">
                          {vacancy.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="lg:flex-shrink-0">
                      <Button className="gap-2 w-full lg:w-auto">
                        Apply Now <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-muted/50 rounded-lg">
              <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-bold font-heading mb-2">No Current Openings</h3>
              <p className="text-muted-foreground">
                We don't have any vacancies at the moment. Please check back later.
              </p>
            </div>
          )}

          {/* General Application */}
          <div className="mt-12 bg-primary/5 rounded-lg p-8 text-center">
            <h3 className="text-xl font-bold font-heading mb-3">
              Don't see a suitable position?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              We're always looking for talented individuals. Send us your CV and we'll 
              keep it on file for future opportunities.
            </p>
            <Button variant="outline" className="gap-2">
              Submit General Application <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VacanciesPage;
