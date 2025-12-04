import { Shield, Heart, Award, Lightbulb, Users } from 'lucide-react';

const values = [
  {
    number: '1',
    title: 'Integrity',
    description: 'We operate with unwavering integrity, maintaining transparency, ethical practices, and strict adherence to regulations and industry standards.',
    icon: Shield,
  },
  {
    number: '2',
    title: 'Safety',
    description: 'We prioritize the safety of our workforce, clients, and the communities in which we operate through continuous improvement of safety practices.',
    icon: Heart,
  },
  {
    number: '3',
    title: 'Quality',
    description: 'We are committed to delivering construction projects of the highest quality, meeting or exceeding client expectations through meticulous planning.',
    icon: Award,
  },
  {
    number: '4',
    title: 'Innovation',
    description: 'We embrace innovation and technological advancements, constantly seeking new and efficient ways to deliver projects.',
    icon: Lightbulb,
  },
  {
    number: '5',
    title: 'Collaboration',
    description: 'We believe in the power of collaboration and teamwork, fostering an inclusive and supportive work environment.',
    icon: Users,
  },
];

const CoreValues = () => {
  return (
    <section id="values" className="section-padding bg-header-bg">
      <div className="container-wide">
        <div className="text-center mb-16">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-header-foreground mb-4">
            Core Values
          </h2>
          <p className="text-header-foreground/70 max-w-2xl mx-auto">
            Our core values guide everything we do and define who we are as a company.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="group relative bg-header-foreground/5 rounded-lg p-6 border border-header-foreground/10 hover:border-primary/50 transition-all duration-300 hover:bg-header-foreground/10"
            >
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-primary rounded-full flex items-center justify-center font-heading font-bold text-primary-foreground text-lg">
                {value.number}
              </div>
              <div className="mb-4 pt-4">
                <value.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-header-foreground mb-3">
                {value.title}
              </h3>
              <p className="text-header-foreground/60 text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;
