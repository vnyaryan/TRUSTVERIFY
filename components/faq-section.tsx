import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "How does the verification process work?",
      answer:
        "Our verification process involves submitting your educational certificates, employment records, and consenting to a background check. Our team verifies these documents with the relevant institutions and authorities to ensure authenticity.",
    },
    {
      question: "How is my trust score calculated?",
      answer:
        "Your trust score is calculated based on the verification of your education (30%), employment history (30%), background check (30%), and profile completeness (10%). Each verified element contributes to your overall score.",
    },
    {
      question: "How can I share my trust score with others?",
      answer:
        "Once your verification is complete, you can generate a secure link or QR code from your dashboard. This link can be shared with potential partners on any platform, allowing them to view your verified trust score and the information you choose to share.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Yes, we take data security very seriously. All your personal information is encrypted and stored securely. We comply with data protection regulations and never share your information without your explicit consent.",
    },
    {
      question: "Can I control who sees my verification details?",
      answer:
        "Absolutely. You have complete control over your privacy settings. You can choose to display your trust score to all recipients while keeping specific verification details private, or customize what information is visible to each recipient.",
    },
    {
      question: "How long does the verification process take?",
      answer:
        "The basic verification process typically takes 3-5 business days. Premium and Enterprise verifications may take 7-10 business days due to the more comprehensive checks involved.",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our verification platform.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl mt-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
