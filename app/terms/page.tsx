import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";

export default function TermsPage() {
  return (
    <Layout>
      <PageHeader title="Terms of Service" />

      <section className="section-padding">
        <div className="container-wide">
          <div className="text-center mb-12">
            <span className="text-header font-semibold text-sm uppercase tracking-wider mb-2 block">
              Legal Terms
            </span>
            <h2 className="heading-3 mb-4">Terms of Service</h2>
            <p className="body-base max-w-3xl mx-auto text-muted-foreground">
              Please read these Terms of Service carefully before using our website and services.
            </p>
          </div>

          <div className="space-y-10">
            <section>
              <h3 className="heading-5 mb-3">1. Acceptance of Terms</h3>
              <p className="body-base text-foreground">
                By accessing or using Kakanga Enterprises’ website and services, you agree to be bound by these Terms. If you do not agree, do not use our services.
              </p>
            </section>

            <section>
              <h3 className="heading-5 mb-3">2. Services</h3>
              <p className="body-base text-foreground">
                We provide construction and engineering services as described on this website. Specific service terms may be outlined in project contracts.
              </p>
            </section>

            <section>
              <h3 className="heading-5 mb-3">3. Quotes and Contracts</h3>
              <p className="body-base text-foreground">
                All quotes are estimates unless otherwise stated. Final scope, pricing, and timelines are governed by signed contracts between the parties.
              </p>
            </section>

            <section>
              <h3 className="heading-5 mb-3">4. Intellectual Property</h3>
              <p className="body-base text-foreground">
                All content on this site (text, graphics, logos, images) is owned or licensed and may not be used without permission.
              </p>
            </section>

            <section>
              <h3 className="heading-5 mb-3">5. User Responsibilities</h3>
              <p className="body-base text-foreground">
                You agree to provide accurate information and not misuse the site or services. Unauthorized use may result in termination.
              </p>
            </section>

            <section>
              <h3 className="heading-5 mb-3">6. Privacy</h3>
              <p className="body-base text-foreground">
                Our handling of personal data is described in our Privacy Policy. By using our services, you consent to such processing.
              </p>
            </section>

            <section>
              <h3 className="heading-5 mb-3">7. Limitation of Liability</h3>
              <p className="body-base text-foreground">
                Kakanga Enterprises is not liable for indirect or consequential damages arising from the use of the website or services.
              </p>
            </section>

            <section>
              <h3 className="heading-5 mb-3">8. Changes to Terms</h3>
              <p className="body-base text-foreground">
                We may update these Terms periodically. Continued use of the site constitutes acceptance of any changes.
              </p>
            </section>

            <section>
              <h3 className="heading-5 mb-3">9. Contact</h3>
              <p className="body-base text-foreground">
                For questions about these Terms, please contact us via the Contact page or email.
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="section-padding bg-header text-white">
        <div className="container-wide">
          <div className="text-center">
            <h2 className="heading-4 text-white mb-4">Have Questions?</h2>
            <p className="body-base text-white/90 mb-8 max-w-2xl mx-auto">
              Reach out for clarifications or more information about our Terms of Service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="bg-white text-header hover:bg-white/90 px-6 py-3 rounded-lg font-medium transition-colors">
                Contact Us
              </a>
              <a href="mailto:info@kakangaconstructions.com" className="border border-white text-white hover:bg-white hover:text-header px-6 py-3 rounded-lg font-medium transition-colors">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}