import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQS = [
  { q: 'Does this cost anything?', a: 'No. Quotes and agent help are free. We are paid by the insurance carrier when you enroll, so your premium is the same either way.' },
  { q: 'Will I get flooded with calls?', a: 'You will hear from a licensed agent about the quote you asked for. You can opt out at any time by replying STOP or emailing privacy@coverage.health.' },
  { q: 'Is this healthcare.gov?', a: 'No. Coverage.Health is a commercial site operated by HealthLink Insurance Agency LLC. We are not a government website and are not affiliated with or endorsed by the U.S. government or the Health Insurance Marketplace.' },
  { q: 'What if I am over 64?', a: 'The quiz is built for ages 18–64. If you are 65 or older, call us and an agent can walk you through supplemental options instead.' },
  { q: 'Which states can you help in?', a: 'AZ, CA, FL, GA, IL, NE, NV, NJ, NC, OH, SC, TN, and TX.' },
];

export default function FaqB() {
  return (
    <section className="bg-white border-t border-[#DCE6F0] py-14 md:py-20">
      <div className="max-w-[720px] mx-auto px-4">
        <h2 className="font-heading font-extrabold text-[#132A47] text-[27px] md:text-[34px] leading-tight tracking-tight text-center mb-8">
          Straight answers
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`i${i}`} className="border border-[#DCE6F0] rounded-[14px] px-5 bg-[#F8FBFF]">
              <AccordionTrigger className="font-heading font-bold text-[#132A47] text-[16px] text-left hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-[#4A6076] text-[15px] leading-relaxed">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}