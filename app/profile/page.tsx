import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

export default function ProfilePage() {
  return (
    <Layout>
      <PageHeader title="Company Profile" backgroundImage="/images/profile-bg.jpg" />
      
      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center">
            <h2 className="heading-3 mb-4">Company Profile</h2>
            <p className="body-base">
              This page is coming soon. We'll provide detailed company profile information here.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}