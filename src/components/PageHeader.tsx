import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  backgroundImage?: string;
}

const PageHeader = ({ title, backgroundImage }: PageHeaderProps) => {
  return (
    <section 
      className="relative h-[360px] md:h-[420px] flex items-center justify-center"
      style={{
        backgroundImage: backgroundImage 
          ? `url(${backgroundImage})` 
          : 'linear-gradient(135deg, hsl(var(--header-bg)), hsl(var(--primary)))',
        backgroundSize: 'cover',
        backgroundPosition: backgroundImage ? 'center' : 'center',
      }}
    >
      {/* Overlay stack to soften busy imagery and keep text legible */}
      <div
        className={`absolute inset-0 ${backgroundImage ? "bg-header-bg/100" : "bg-header-bg/12"}`}
        aria-hidden="true"
      />
      {backgroundImage && (
        <div className="absolute inset-0 bg-black/75 mix-blend-multiply" aria-hidden="true" />
      )}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-header-bg/95 via-header-bg/60 to-transparent" aria-hidden="true" />
      <div className="relative z-10 text-center text-header-foreground">
        <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4">{title}</h1>
        <div className="flex items-center justify-center gap-2 text-sm md:text-base">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-primary">{title}</span>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
