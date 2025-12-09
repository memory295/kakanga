import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CoreValues from "@/components/CoreValues";
import Contact from "@/components/Contact";
import Services from "@/components/Services";

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
