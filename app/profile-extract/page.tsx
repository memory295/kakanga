import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

export default function ProfileExtractPage() {
  return (
    <Layout>
      <PageHeader title="Profile Extract" backgroundImage="/images/project.png" />
      
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center">
            <h2 className="heading-3 mb-4">Profile Extract</h2>
            <p className="body-base">
              This page is coming soon. We'll provide profile extract information here.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}