import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import LiveChat from "@/components/LiveChat";
const HelpCenter = () => {
  const faqs = [{
    question: "How do I adopt a pet?",
    answer: "Browse our available pets, select the one you love, and click 'Add to Cart'. Then proceed to checkout, fill in your details, and complete the payment. Our team will contact you within 24-48 hours to arrange the adoption."
  }, {
    question: "What payment methods do you accept?",
    answer: "We accept online payments via UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD with ₹100 extra charge)."
  }, {
    question: "Can I return or exchange a pet?",
    answer: "Due to the nature of pet adoption, we don't have a return policy. However, if you face any issues within 7 days, please contact our support team and we'll help resolve the situation."
  }, {
    question: "How do I track my order?",
    answer: "You can track your order status by visiting the 'My Orders' section in your account. You'll receive email and SMS updates at each stage of your order."
  }, {
    question: "How long does delivery take?",
    answer: "Pet delivery typically takes 3-7 business days depending on your location. Our team will coordinate with you to arrange a convenient delivery time."
  }, {
    question: "Do pets come vaccinated?",
    answer: "Yes, all our pets are fully vaccinated and come with complete health certificates. We also provide a starter kit with food and basic supplies."
  }, {
    question: "Can I visit the pet before adoption?",
    answer: "Absolutely! We encourage you to visit our center to meet the pet before making a decision. Contact our support team to schedule a visit."
  }];
  return <div className="min-h-screen flex flex-col">
      <Navbar />
      <LiveChat />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Help Center</h1>
        <p className="text-muted-foreground mb-8">
          Find answers to common questions or contact our support team
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Email Support</h3>
            <p className="text-sm text-muted-foreground mb-3">petnest@gmail.com</p>
            <Button variant="outline" size="sm">
              Send Email
            </Button>
          </Card>

          <Card className="p-6 text-center">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Phone Support</h3>
            <p className="text-sm text-muted-foreground mb-3">+91 8018119112</p>
            <Button variant="outline" size="sm">
              Call Now
            </Button>
          </Card>

          <Card className="p-6 text-center bg-primary/5">
            <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">Live Chat Active</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Click the chat button below to start
            </p>
            <div className="text-xs text-primary font-medium">
              Available 24/7
            </div>
          </Card>
        </div>

        <Card className="p-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </Card>
      </main>
      <Footer />
    </div>;
};
export default HelpCenter;