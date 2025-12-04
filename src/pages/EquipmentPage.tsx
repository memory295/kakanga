import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

const equipment = [
  {
    name: "Excavators",
    description: "Modern hydraulic excavators for earthmoving and excavation work",
    specs: ["20-50 ton capacity", "Various bucket sizes", "Long reach available"],
    image: "/placeholder.svg",
  },
  {
    name: "Bulldozers",
    description: "Powerful bulldozers for land clearing and grading operations",
    specs: ["D6-D9 class", "GPS guided", "Ripper attachments"],
    image: "/placeholder.svg",
  },
  {
    name: "Graders",
    description: "Precision motor graders for road construction and maintenance",
    specs: ["14-16ft blade", "Automatic controls", "GPS enabled"],
    image: "/placeholder.svg",
  },
  {
    name: "Compactors",
    description: "Vibratory and static rollers for soil and asphalt compaction",
    specs: ["10-20 ton", "Padfoot & smooth drum", "Self-propelled"],
    image: "/placeholder.svg",
  },
  {
    name: "Dump Trucks",
    description: "Fleet of dump trucks for material transportation",
    specs: ["25-40 ton capacity", "All-terrain capable", "Well maintained"],
    image: "/placeholder.svg",
  },
  {
    name: "Loaders",
    description: "Wheel and track loaders for material handling",
    specs: ["3-5 cubic meter bucket", "Quick coupler", "Various attachments"],
    image: "/placeholder.svg",
  },
  {
    name: "Concrete Equipment",
    description: "Mixers, pumps, and batching plants for concrete works",
    specs: ["Mobile batching", "Concrete pumps", "Transit mixers"],
    image: "/placeholder.svg",
  },
  {
    name: "Drilling Rigs",
    description: "Specialized drilling equipment for foundation and blasting",
    specs: ["Rotary drills", "DTH hammers", "Core drilling"],
    image: "/placeholder.svg",
  },
];

const EquipmentPage = () => {
  return (
    <Layout>
      <PageHeader title="Our Equipment" />
      
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Modern <span className="text-primary">Fleet</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We maintain a comprehensive fleet of modern construction equipment 
              to handle projects of any scale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {equipment.map((item, index) => (
              <div 
                key={index}
                className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold font-heading mb-2 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {item.description}
                  </p>
                  <ul className="space-y-1">
                    {item.specs.map((spec, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Stats */}
      <section className="py-16 bg-header-bg text-header-foreground">
        <div className="container-wide px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold font-heading text-primary mb-2">100+</div>
              <div className="text-header-foreground/80">Total Equipment</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-heading text-primary mb-2">95%</div>
              <div className="text-header-foreground/80">Operational Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-heading text-primary mb-2">24/7</div>
              <div className="text-header-foreground/80">Maintenance Support</div>
            </div>
            <div>
              <div className="text-4xl font-bold font-heading text-primary mb-2">Modern</div>
              <div className="text-header-foreground/80">GPS Technology</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EquipmentPage;
