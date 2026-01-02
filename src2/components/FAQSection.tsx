import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "How do I choose the right pet for my family?",
      answer: "We recommend considering your living space, lifestyle, and family situation. Our pet experts can help guide you through the selection process. Visit our adoption form page or chat with us to discuss your preferences and find the perfect match."
    },
    {
      id: 2,
      question: "Are all pets health-checked and vaccinated?",
      answer: "Yes! Every pet in our catalog has undergone comprehensive health checks, vaccinations, and necessary medical treatments. We provide complete health certificates and vaccination records for all adopted pets."
    },
    {
      id: 3,
      question: "How long does the adoption process take?",
      answer: "The adoption process typically takes 3-7 business days from the time you submit your adoption request. This includes verification, paperwork, and arrangement of pet delivery. We'll keep you updated throughout the process."
    },
    {
      id: 4,
      question: "Do you offer delivery services?",
      answer: "Yes! We offer safe and secure delivery services across India. Your pet will be transported in comfortable, climate-controlled conditions with proper care. You can track your pet's delivery in real-time."
    },
    {
      id: 5,
      question: "What if I need help after adoption?",
      answer: "Our support doesn't end at adoption! We provide 24/7 customer support, training guides, health advice, and ongoing guidance to help you and your pet adjust. You can reach out to us anytime with questions or concerns."
    },
    {
      id: 6,
      question: "Can I return a pet if it doesn't work out?",
      answer: "We want every adoption to be successful. If you face any serious issues, please contact us immediately. We'll work with you to find solutions or discuss alternatives. Our goal is ensuring both you and your pet are happy."
    },
    {
      id: 7,
      question: "Do you ship internationally?",
      answer: "Currently, we deliver within India. However, we're expanding our services. Please check back or contact us directly for information about international shipping possibilities."
    },
    {
      id: 8,
      question: "What payment methods do you accept?",
      answer: "We accept all major payment methods including credit/debit cards, digital wallets, net banking, and more through our secure Cashfree payment gateway. All transactions are encrypted and secure."
    }
  ];

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about our pets, adoption process, and services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item) => (
            <div
              key={item.id}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-soft hover:shadow-hover transition-all duration-300"
            >
              <button
                onClick={() => toggleExpand(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-accent/30 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {item.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                    expandedId === item.id ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {expandedId === item.id && (
                <div className="px-6 py-4 border-t border-border bg-background/50">
                  <p className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-6">
            Didn't find your answer? We're here to help!
          </p>
          <a
            href="/help-center"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Visit Help Center
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
