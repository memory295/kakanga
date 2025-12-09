import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;
    setIsSending(true);
    try {
      toast({ title: 'Sending…', description: 'Submitting your message now.' });

      // EmailJS configuration from environment (vite env variables)
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS not configured');
      }

      const templateParams = {
        to_email: 'memorynamtunda@gmail.com',
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      };

      await emailjs.send(serviceId, templateId, templateParams, { publicKey });

      toast({
        title: 'Message Sent',
        description: 'Thank you for contacting us. We\'ll get back to you soon.',
      });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      // Fallback: open mail client so the user can still send
      const to = 'memorynamtunda@gmail.com';
      const subject = encodeURIComponent(`[Kakanga Website] ${formData.subject}`);
      const bodyLines = [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        formData.phone ? `Phone: ${formData.phone}` : undefined,
        '',
        formData.message,
      ].filter(Boolean) as string[];
      const body = encodeURIComponent(bodyLines.join('\n'));
      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
      toast({
        title: 'Opening mail client…',
        description: 'EmailJS not configured or network slow. Sending via your email app.',
      });
    }
    setIsSending(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-2 block">
            Contact Us
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Get In Touch
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to start your next construction project? Contact us today for a free consultation and quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 bg-white/30 rounded-lg border border-gray-100 hover:bg-white/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-1">Our Location</h3>
                <p className="text-muted-foreground">Area 47, Sector 4, Lilongwe, Malawi</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white/30 rounded-lg border border-gray-100 hover:bg-white/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-1">Mobile</h3>
                <p className="text-muted-foreground">+265 995 650 428</p>
                <p className="text-muted-foreground">+265 882 500 960</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-white/30 rounded-lg border border-gray-100 hover:bg-white/50 transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-1">E-mail</h3>
                <p className="text-muted-foreground">ckakanga@gmail.com</p>
                <p className="text-muted-foreground">kabaghe63@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg text-foreground mb-1">Working Hours</h3>
                <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM</p>
                <p className="text-muted-foreground">Saturday: 8:00 AM - 12:00 PM</p>
              </div>
            </div>

            <div className="pt-4">
              <Link to="/contact">
                <Button variant="outline" className="w-full">
                  View Full Contact Page
                </Button>
              </Link>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/30 p-8 rounded-lg border border-gray-100">
            <h3 className="font-heading font-semibold text-xl mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    aria-label="Full Name"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    aria-label="Email Address"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
                    placeholder="Email Address"
                    required
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    aria-label="Phone Number"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    aria-label="Subject"
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground"
                    placeholder="Subject"
                    required
                  />
                </div>
              </div>
              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  aria-label="Message"
                  className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-all placeholder:text-muted-foreground"
                  placeholder="Message"
                  required
                />
              </div>
              <Button type="submit" size="lg" className="w-full gap-2" disabled={isSending}>
                <Send className="w-4 h-4" />
                {isSending ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
