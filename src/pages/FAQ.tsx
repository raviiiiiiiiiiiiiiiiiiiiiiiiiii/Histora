import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "motion/react";

const faqs = [
  {
    question: "How are the products made?",
    answer: "Every product on Hastoria is handcrafted by independent artisans across India. We focus on traditional techniques and sustainable materials to ensure each piece has a story of its own."
  },
  {
    question: "What is the delivery time?",
    answer: "Since our products are handmade, delivery times may vary. Typically, it takes 5-7 business days for domestic orders. You can track your order progress in your profile page."
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes! We offer Cash on Delivery for all orders within India to ensure a safe and trustworthy shopping experience for our customers."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 7-day return policy for damaged or incorrect items. Since these are handmade, minor variations in color or texture are expected and celebrated as part of the artisan charm."
  },
  {
    question: "How can I become a seller on Hastoria?",
    answer: "We are always looking for talented artisans! Click on the 'Become a Seller' button in the hero section or footer to start your application process."
  }
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-[#fdfcfb] pt-32 pb-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-primary font-medium uppercase tracking-widest text-sm mb-4">Support Center</p>
          <h1 className="text-5xl font-heading font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-muted-foreground text-lg">Everything you need to know about Hastoria and our artisan community.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-secondary/50"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-secondary/50 py-2">
                <AccordionTrigger className="text-left font-heading text-xl font-bold hover:text-primary transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-lg leading-relaxed pt-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <div className="mt-24 text-center p-12 bg-primary/5 rounded-[40px] border border-primary/10">
          <h3 className="text-2xl font-heading font-bold mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-8">We're here to help you with any queries about our products or services.</p>
          <button className="olive-button px-8 h-14">Contact Support</button>
        </div>
      </div>
    </div>
  );
}
