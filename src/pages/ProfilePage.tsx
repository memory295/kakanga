import Layout from "@/components/Layout";

const ProfilePage = () => {
  return (
    <Layout>
      <div className="container-wide py-16">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">Company Profile</h1>
        <p className="text-muted-foreground mb-6">
          The Kakanga Constructions company profile is embedded below. You can also
          <a className="text-primary underline ml-1" href="/kakanga-profile.pdf" target="_blank" rel="noreferrer">open</a>
          or <a className="text-primary underline ml-1" href="/kakanga-profile.pdf" download>download</a> the PDF.
        </p>
        <div className="w-full aspect-[4/3] md:aspect-[16/9] bg-muted rounded-md overflow-hidden">
          <iframe
            title="Kakanga Constructions Profile"
            src="/kakanga-profile.pdf"
            className="w-full h-full"
          />
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
