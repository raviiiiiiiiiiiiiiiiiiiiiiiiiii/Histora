import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "How are the products made?",
    answer: "Every product on Hastoria is handcrafted by independent artisans across India. We focus on traditional techniques and sustainable materials."
  },
  {
    question: "What is the delivery time?",
    answer: "Typically, it takes 5-7 business days for domestic orders. You can track your order progress in your profile page."
  },
  {
    question: "Do you offer Cash on Delivery (COD)?",
    answer: "Yes! We offer Cash on Delivery for all orders within India to ensure a safe shopping experience."
  }
];

export default function FAQSection() {
  return (
    <section className="py-24 bg-[#fdfcfb]">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <p className="text-primary font-medium uppercase tracking-widest text-sm mb-4">Common Queries</p>
          <h2 className="text-4xl font-heading font-bold mb-6">Frequently Asked Questions</h2>
        </div>

        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-sm border border-secondary/50">
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
          <div className="mt-8 text-center">
            <Link to="/faq" className="text-primary font-bold hover:underline">View All FAQs</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
