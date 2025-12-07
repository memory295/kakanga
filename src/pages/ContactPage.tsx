import { useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Location",
    details: ["Area 3, Plot No. 123", "Lilongwe, Malawi"],
  },
  {
    icon: Phone,
    title: "Mobile",
    details: ["+265 995 650 428", "+265 882 500 960"],
  },
  {
    icon: Mail,
    title: "E-mail",
    details: ["ckakanga@gmail.com", "kabaghe63@gmail.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Fri: 8:00 AM - 5:00 PM", "Sat: 8:00 AM - 12:00 PM"],
  },
];

const ContactPage = () => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);
    try {
      toast({ title: "Sending…", description: "Submitting your message now." });

      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS not configured");
      }

      const templateParams = {
        to_email: "memorynamtunda@gmail.com",
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, { publicKey });

      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      // Fallback: open mail client
      const to = "memorynamtunda@gmail.com";
      const subject = encodeURIComponent(`[Kakanga Website] ${formData.subject}`);
      const bodyLines = [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        formData.phone ? `Phone: ${formData.phone}` : undefined,
        "",
        formData.message,
      ].filter(Boolean) as string[];
      const body = encodeURIComponent(bodyLines.join("\n"));
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      toast({
        title: "Opening mail client…",
        description: "EmailJS not configured or network slow. Sending via your email app.",
      });
    }
    setIsSending(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout>
      <PageHeader title="Contact Us" />
      
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold font-heading mb-6">Get In Touch</h2>
              <p className="text-muted-foreground mb-8">
                Have a project in mind? Contact us today to discuss your construction needs.
              </p>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-muted-foreground text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold font-heading mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-label="Full Name"
                        placeholder="Full Name"
                        required
                      />
                    </div>
                    <div>
                      <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-label="Email Address"
                        placeholder="Email Address"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Input 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        aria-label="Phone Number"
                        placeholder="Phone Number"
                      />
                    </div>
                    <div>
                      <Input 
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        aria-label="Subject"
                        placeholder="Subject"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      aria-label="Message"
                      placeholder="Message"
                      rows={6}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="gap-2" disabled={isSending}>
                    <Send className="w-4 h-4" />
                    {isSending ? "Sending…" : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-[400px] bg-muted">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123992.04619774!2d33.74!3d-13.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1921d4e7c4c1e4e7%3A0x1234567890abcdef!2sLilongwe%2C%20Malawi!5e0!3m2!1sen!2s!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Kakanga Constructions Location"
        />
      </section>
    </Layout>
  );
};

export default ContactPage;
