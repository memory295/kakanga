'use client';

import { useState } from 'react';
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import emailjs from '@emailjs/browser';

export default function ContactPage() {
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

      // EmailJS configuration from environment
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

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
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-header/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-header" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Our Location</h3>
                    <p className="text-muted-foreground text-sm">Karonga</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-header/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-header" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Mobile</h3>
                    <p className="text-muted-foreground text-sm">+265 995 650 428</p>
                    <p className="text-muted-foreground text-sm">+265 882 500 960</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-header/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-header" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">E-mail</h3>
                    <p className="text-muted-foreground text-sm">ckakanga@gmail.com</p>
                    <p className="text-muted-foreground text-sm">kabaghe63@gmail.com</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-header/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-header" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Working Hours</h3>
                    <p className="text-muted-foreground text-sm">Monday - Friday: 8:00 AM - 5:00 PM</p>
                    <p className="text-muted-foreground text-sm">Saturday: 8:00 AM - 12:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold font-heading mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-label="Full Name"
                        placeholder="Full Name"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-header/50 transition-all placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-label="Email Address"
                        placeholder="Email Address"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-header/50 transition-all placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        aria-label="Phone Number"
                        placeholder="Phone Number"
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-header/50 transition-all placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        aria-label="Subject"
                        placeholder="Subject"
                        required
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-header/50 transition-all placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-header/50 resize-none transition-all placeholder:text-muted-foreground"
                    />
                  </div>
                  <Button type="submit" size="default" className="gap-2 shadow-sm hover:shadow-md" disabled={isSending}>
                    <Send className="w-3 h-3" />
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3853.7234567890123!2d33.9217963!3d-9.942259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19018546d89f7e0f%3A0x9ab2c7c4c75222b5!2sKAKANGA%20CONSTRUCTIONS!5e0!3m2!1sen!2smw!4v1703680000000!5m2!1sen!2smw"
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
}