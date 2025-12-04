import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
  title: string;
  backgroundImage?: string;
}

const PageHeader = ({ title, backgroundImage }: PageHeaderProps) => {
  return (
    <section 
      className="relative h-[300px] md:h-[350px] flex items-center justify-center"
      style={{
        backgroundImage: backgroundImage 
          ? `url(${backgroundImage})` 
          : 'linear-gradient(135deg, hsl(var(--header-bg)), hsl(var(--primary)))',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-header-bg/70" />
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
