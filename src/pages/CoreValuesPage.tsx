import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Shield, Leaf, HardHat } from "lucide-react";
import CoreValues from "@/components/CoreValues";

const CoreValuesPage = () => {
  return (
    <Layout>
      <PageHeader title="Core Values" />
      <CoreValues />
    </Layout>
  );
};

export default CoreValuesPage;
