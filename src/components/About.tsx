import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Download, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

const About = () => {
  const lines = [
    'What sets us apart is our dedication to modern',
    'construction techniques and sustainable practices.',
    'We specialize in prefabricated structures, which',
    'allow for faster, more cost-effective, and',
    'environmentally friendly building solutions without',
    'compromising durability. Our team stays ahead of',
    'industry trends by incorporating advanced materials',
    'and smart construction methods, ensuring that',
    'every project we undertake is built to last. Whether',
    "it's a custom designed home, a steel warehouse, or",
    'a government infrastructure project, we bring the',
    'same level of precision  and  professionalism  to',
    'every build we deliver.',
  ];

  // Exactly two paragraphs (two slides of three lines each)
  const slides: string[][] = [lines.slice(0, 3), lines.slice(3, 6)];
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section id="about" className="bg-section-alt pt-6 md:pt-8 pb-16 md:pb-24 px-4 md:px-8">
      <div className="container-wide">
        {/* Intro text slider (positioned close to hero tagline) */}
        <div className="mt-1 mb-7 md:mb-9">
          <div className="container-wide mx-auto text-center">
            {slides[activeSlide].map((l, i) => (
              <p key={i} className="text-foreground text-base md:text-lg leading-snug">
                {l}
              </p>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-center gap-2">
            {[0, 1].map((idx) => (
              <button
                key={idx}
                aria-label={`Slide ${idx + 1}`}
                onClick={() => setActiveSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  activeSlide === idx ? 'bg-primary' : 'bg-primary/30 hover:bg-primary/60'
                }`}
              />
            ))}
          </div>
        </div>
        {/* Vision & Mission (ultra-tight spacing) */}
        <div className="grid md:grid-cols-2 gap-6 mb-4">
          <div className="bg-card p-8 rounded-lg shadow-md card-hover">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-4 text-foreground">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To grow and become a successful bigger company that can work even International, whereby so doing creating job opportunities for the non working people, helping the Government to develop our country and improve lives of our Employees.
            </p>
          </div>
          <div className="bg-card p-8 rounded-lg shadow-md card-hover">
            <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-xl mb-4 text-foreground">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              A quality products, satisfactory services, accountability and Safety is our mission.
            </p>
          </div>
        </div>

        {/* About Company section removed as requested */}
      </div>
    </section>
  );
};

export default About;
