import React, { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Card, CardContent } from "@/components/ui/Card";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#fdfcfb] pt-32 pb-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            {/* Left Column: Info */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <p className="text-primary font-medium uppercase tracking-widest text-sm mb-4">Get in Touch</p>
                <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6 tracking-tight">We'd love to <span className="text-primary italic">hear</span> from you.</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Have a question about a product, an order, or interested in becoming a seller? Our team is here to help.
                </p>
              </div>

              <div className="space-y-8">
                {[
                  { icon: Mail, title: "Email Us", detail: "hastoria.market@gmail.com", sub: "We'll respond within 24 hours." },
                  { icon: MessageSquare, title: "Live Chat", detail: "Available 10 AM - 6 PM IST", sub: "Monday to Saturday" },
                  { icon: MapPin, title: "Visit Us", detail: "Pan-India Handmade Marketplace", sub: "Headquarters in Jaipur, Rajasthan" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-primary shrink-0 border border-border/50">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                      <p className="text-foreground font-medium">{item.detail}</p>
                      <p className="text-sm text-muted-foreground">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-border/50">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Follow our journey</p>
                <div className="flex gap-4">
                  {[Instagram, Twitter, Facebook].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-full bg-white border border-border/50 flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-7">
              <Card className="artisan-card border-none shadow-2xl bg-white p-8 md:p-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px]" />
                <CardContent className="p-0 relative z-10">
                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Send size={32} />
                      </div>
                      <h2 className="text-3xl font-heading font-bold mb-4">Message Sent!</h2>
                      <p className="text-muted-foreground text-lg mb-8">
                        Thank you for reaching out. We've received your message and will get back to you shortly.
                      </p>
                      <Button onClick={() => setSubmitted(false)} variant="outline" className="rounded-full px-8 h-12 border-primary/20">Send another message</Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Your Name</Label>
                          <Input required placeholder="John Doe" className="h-14 rounded-2xl bg-secondary/10 border-none px-6" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</Label>
                          <Input required type="email" placeholder="john@example.com" className="h-14 rounded-2xl bg-secondary/10 border-none px-6" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subject</Label>
                        <Input required placeholder="How can we help?" className="h-14 rounded-2xl bg-secondary/10 border-none px-6" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</Label>
                        <textarea 
                          required
                          className="w-full min-h-[150px] p-6 rounded-2xl bg-secondary/10 border-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                          placeholder="Tell us more about your inquiry..."
                        />
                      </div>
                      <Button 
                        disabled={isSubmitting}
                        className="olive-button w-full h-16 text-xl shadow-xl group"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        <Send className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={20} />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
