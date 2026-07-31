import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function LanderFaq({ heading, faqs }) {
  return (
    <section className="pb-16 md:pb-24">
      <div className="max-w-3xl mx-auto px-5 md:px-10">
        <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight mb-8">{heading}</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map(([q, a], i) => (
            <AccordionItem key={q} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-display font-bold text-slate-900 text-[17px]">{q}</AccordionTrigger>
              <AccordionContent className="text-[15.5px] text-slate-600 leading-relaxed">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}