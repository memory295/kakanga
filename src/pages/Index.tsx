import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import CoreValues from "@/components/CoreValues";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <CoreValues />
      <Contact />
    </Layout>
  );
};

export default Index;
