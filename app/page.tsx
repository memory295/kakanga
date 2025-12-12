import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import About from "@/components/About";
import CoreValues from "@/components/CoreValues";
import Contact from "@/components/Contact";
import Services from "@/components/Services";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <CoreValues />
      <Contact />
    </Layout>
  );
}