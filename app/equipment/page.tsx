import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipment",
  description:
    "Construction equipment and machinery information from Kakanga Constructions.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function EquipmentPage() {
  return (
    <Layout>
      <PageHeader title="Equipment" backgroundImage="/images/equipment-bg.jpg" />
      
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center">
            <h2 className="heading-3 mb-4">Our Equipment</h2>
            <p className="body-base">
              This page is coming soon. We'll showcase our construction equipment and machinery here.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}